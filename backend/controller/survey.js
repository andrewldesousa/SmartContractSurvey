const Survey = require('../models/survey')
const Question = require('../models/question')
const Response = require('../models/response')
const { errorHandler } = require('../helpers/dbErrorHandler')
const User = require('../models/user')

//Storing survey data and question collection
exports.storeResult = (req, res) => {
    for (element in req.body.responses) {
        const response = new Response(req.body.responses[element])
        response.save((err, response) => {
            if (err)
                return errorHandler(response, err);
        })
    }
    res.json(req.body.responses)
}

exports.storeQuestions = (req, res) => {
    for (element in req.body.questions) {
        const question = new Question(req.body.questions[element])
        question.save((err, question) => {
            if (err)
                return errorHandler(question, err);
        })
    }
    res.json(req.body.questions)
}

exports.createSurvey = (req, res) => {
    req.body.owner = req.auth._id
    const survey = new Survey(req.body)
    survey.save((err, survey) => {
        if (err) return errorHandler(survey, err);
        res.json(req.body);
    });
}

//Retrival and viewing 
exports.getSurvey = (req, res,next) => {
    Response.find({},function(err,data){
        if (err) console.log(err)
        if (!data) {
            return res.status(400).json({ err });
        }
        if (err) {
            return err
        }
        res.json()//add filtered result 
        next()
    })
}

exports.getResponse = (req, res, next) => {
    Response.find({ "question_id": req.body.Qid }, function (err, data) {
        if (err) console.log(err)
        if (!data) {
            return res.status(400).json({ err });
        }
        if (err) {
            return err
        }
        res.json(data);
        next();
    })
}