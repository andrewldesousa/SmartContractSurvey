const Survey = require('../models/survey')
const Question = require('../models/question')
const Response = require('../models/response')
const { errorHandler } = require('../helpers/dbErrorHandler')
const User = require('../models/user')
const { test } = require('./user')

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

exports.getSurvey = (req, res, next) => {
    Question.find({ 'survey_id': req.body.S_id }, function (err, data) {
        if (err) console.log(err)
        if (!data) {
            return res.status(400).json({ err });
        }
        res.json(data)
        next()
    })
}

exports.getResponse = (req, res, next) => {
    Response.find({ "question_id": req.body.Qid }, function (err, data) {
        if (err) console.log(err)
        if (!data) {
            return res.status(400).json({ err });
        }
        res.json(data);
        next();
    })
}

exports.getResponceCount = (req, res, next) => {
    Question.find({ 'survey_id': req.body.S_id }, function (err, data) {
        if (err) console.log(err)
        if (!data) {
            return res.status(400).json({ err });
        }
        /*var collect={}
        var a = []
        var b = []
        for (i in data){
            if (!a.includes(i['Qid'])){
                a.push(i['Qid'])
                b.push(1)
            }
            else{
                b[a.indexOf(i['Qid'])] = b[a.indexOf(i['Qid'])] + 1
            }
        }
        for (c=0;c<a.length;++c){
            collect[a[c]] = b[c]
        }*/
        var collect={}
        for (var iter = 0; iter < data.length; ++iter) {
            var temp = data[iter]['_id']
            Response.find({ 'question_id': temp }, function (err1, Resdata) {
                if (err1) console.log(err1)
                if (!Resdata) {
                    return res.status(400).json({ err1 });
                }
                var a = []
                var b = []
                for (var j = 0; j < Resdata.length; ++j) {
                    if (!a.includes(Resdata[j]['answer'])) {
                        a.push(Resdata[j]['answer'])
                        b.push(1)
                    }
                    else {
                        b[a.indexOf(Resdata[j]['answer'])]++;
                    }
                }
                for (var j = 0; j < a.length; ++j) {
                    collect[`${temp}`] = { "answer": a[j], "Count": b[j] }
                    /*
                    * The collect is not collecting but it is storing only the 
                    * temp values for one option for a question  
                    */
                }
            })
        }
        res.json(collect);
        next();
    })
}
