const Survey = require('../models/survey')
const Question = require('../models/question')
const Response = require('../models/response')
const { errorHandler } = require('../helpers/dbErrorHandler')
const question = require('../models/question')

//Storing survey data collected from respondents
exports.storeResult = (req, res) => { 
    for (element in req.body.responses) {
        const response = new Response(req.body.responses[element])
        response.save((err, response) => {
            if (err){
                return errorHandler(err);
            }
            else{
                console.log(response)
            }
        })
    }
    res.json(req.body.responses)
}

//Storing survey questions by sections 
exports.storeQuestions = (req, res) => {
    for (element in req.body) {
        for (inner_element in req.body[element]){
            const question = new Question(req.body[element][inner_element])
            question.save((err, question) => {
                if (err)
                    return errorHandler(err);
            })
        }
    }
    res.json(req.body)
}

//Function to store a single questoin into the survey 
exports.storeOneQuestion = (req, res) => {
        const question = new Question(req.body.question)
        question.save((err, question) => {
            if (err)
                return errorHandler(question, err);
        })
    res.json(req.body.question)
}

//Creates the survey 
exports.createSurvey = (req, res) => {
    req.body.owner = req.auth._id
    const survey = new Survey(req.body)
    survey.save((err, survey) => {
        if (err) return errorHandler(survey, err);
        res.json(survey);
    });
}