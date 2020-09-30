const Survey = require('../models/survey')
const Question = require('../models/qusetion')
const Response = require('../models/response')
const {errorHandler} = require('../helpers/dbErrorHandler')
const user = require('../models/user')

exports.storeResult= (req,res) =>{
    const reqIter=[]
    for( element in req.body.responses) 
    {
        const response = new Response(req.body.responses[element])
        response.save((err,response) => {
            if (err) 
                return errorHandler(response, err);
                reqIter.push(response);
        })
    }
    res.json({reqIter})
}

exports.storeQuestions= (req,res) =>{
    const reqIter=[]
    for( element in req.body.questions) 
    {
        const question = new Question(req.body.questions[element])
        question.save((err,question) => {
            if (err) 
                return errorHandler(question, err);
                reqIter.push(question);
        })
    }
    res.json({reqIter})
}

exports.createSurvey= (req,res) =>{
    const survey = new Survey(req.body)
    survey.save((err, survey)=>{
        if (err) return errorHandler(survey,err)
        res.json(req.body)
        user.survey(req.body.owner,{questionList:questionList+req.body._id})
    })
}