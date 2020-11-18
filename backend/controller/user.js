const User = require('../models/user')
const {errorHandler} = require('../helpers/dbErrorHandler')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const bcrypt = require('bcrypt');
const Survey = require('../models/survey')

exports.test = (req,res)=>{
    res.send("List of questions!")
}

exports.signup = (req,res)=>{
    const user = new User(req.body)
    console.log("req.body",req.body)
    user.save((err,user)=> {
        if(err){
            return res.status(400).json({
                err:errorHandler(err)
            })
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({
            user
        })
    }) 
}

exports.signin=(req,res)=>{
    //find user by email
    const {email,password}=req.body
    User.findOne({email},(err,user)=>{
        if (err || !user){
            return res.status(400).json({
                error:"Please check the email or signup!"
            })
        }
        //authenticating the user pass
        if (!user.authenticate(password)){
            return res.status(401).json({
                error:"Incorrect password entered!"
            })  
        }
        //Generating a signed token with uid and secret 
        const token =jwt.sign({_id:user._id},process.env.JWT_secret)
        res.cookie("t", {expire:new Date()+9999})
        const {_id, name, email} = user
        return res.json({token,user:{_id,name,email}}) 
    }) 
} 

exports.signout=(req,res)=>{
    res.clearCookie("t")
    res.json({message:"Signed out!"})
}

exports.requireSignin = expressJWT({
    secret: process.env.JWT_secret,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
  });

exports.userById = (req, res, next, id) => {
    User.findById(id)
        .exec((err, user) => {
            if (!user) return res.status(404).json({error: 'User id does not exist'});
            if (err) return errorHandler(res, err);
            req.profile = user;
            next();
        });
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    res.json(req.profile);
};

//This is the dummy submit funciton comes without any functions other than the return statement 
exports.submit = (req, res) => {
    res.json({message : 'Succcess'});
};

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_secret, (err, user) => {
            console.log(err);
            if (err) {
                return res.sendStatus(403);
            }
            req.auth = user;
            req.isAuthenticated = true;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

/*
    Checks if the User ID set in URL path (:userId) is equal to the one that te JWT belongs to
 */
exports.authorize = (req, res, next) => {
    let authorized = req.profile && req.profile._id.equals(req.auth._id);
    if (!authorized) return res.status(403).json({error: 'Access denied'});
    next();
};

exports.getSurveyByOwner = (req, res, next) => {
    Survey.find({ 'owner': req.profile._id }, function (err, data) {
        if (err) console.log(err)
        if (!data) {
            return res.status(400).json({ err });
        }
        res.json(data)
        next()
    })
}