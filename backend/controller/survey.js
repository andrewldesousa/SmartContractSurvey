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
    console.log(req.body.questions)
}

exports.storeOneQuestion = (req, res) => {
        const question = new Question(req.body.question)
        question.save((err, question) => {
            if (err)
                return errorHandler(question, err);
        })
    res.json(req.body.question)
}

exports.createSurvey = (req, res) => {
    req.body.owner = req.auth._id
    const survey = new Survey(req.body)
    survey.save((err, survey) => {
        if (err) return errorHandler(survey, err);
        res.json(req.body);
    });
}

exports.getSurveyByOwner = (req, res, next) => {
    Survey.find({ 'owner': req.body.Oid }, function (err, data) {
        if (err) console.log(err)
        if (!data) {
            return res.status(400).json({ err });
        }
        res.json(data)
        next()
    })
}

exports.getSurvey = (req, res, next) => {
    Survey.find({ '_id': req.body.S_id }, function (err, data) {
        if (err) console.log(err)
        if (!data) {
            return res.status(400).json({ err });
        }
        res.json(data)
        next()
    })
}

exports.getSurveyQuesitons = (req, res, next) => {
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




exports.getResponceCount = (req, res) => {
    Question.find({ 'survey_id': req.body.S_id }, { '_id': 1 }, function (err, data) {
        if (err) console.log(err)
        if (!data) {
            return res.status(400).json({ err });
        }
    }).then(function (data) {
        var dataList=[]
        for (i in data){
            dataList.push(data[i]['_id'])
        }
        console.log(dataList)
        Response.aggregate(
            [
                { $match: { 'question_id': {$in:dataList} } },
                { $group: { _id: {Qid : '$question_id', answer:'$answer'}, count: { $sum: 1 } } }
            ],
            function (err1, data1) {
                
                if (err1) console.log(err1)
                if (!data1) {
                    return res.status(400).json({ err1 });
                }
                else{
                    console.log(data1)
                    res.json(data1)
                }
            }
        )
    })
}


exports.getResponceCountOld = (req, res) => {

    Question.find({ 'survey_id': req.body.S_id }, { '_id': 1 }, function (err, data) {
        if (err) console.log(err)
        if (!data) {
            return res.status(400).json({ err });
        }
    }).then(function (data) {
        var collect = {}
        for (var iter = 0; iter < data.length; ++iter) {
            var temp = data[iter]['_id']
            console.log(getX(temp))
            collect = getX(temp)
        }
        //console.log(collect)
        res.json(collect);
    })
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
}

function getX(temp) {
    Response.find({ 'question_id': temp }, function (err1, Resdata) {
        if (err1)
            console.log(err1)
    }).then(function (Resdata) {
        return findIt(Resdata, temp)
    })
}

function findIt(Resdata, temp) {
    var a = []
    var b = []
    var bucket = []
    for (var j = 0; j < Resdata.length; ++j) {
        if (!a.includes(Resdata[j]['answer'])) {
            a.push(Resdata[j]['answer'])
            b.push(1)
        }
        else {
            b[a.indexOf(Resdata[j]['answer'])]++;
        }
    }
    //console.log(combineIt(a,b,temp))
    return combineIt(a, b, temp)
}

function combineIt(a, b, temp) {
    var collect = {}
    var bucket = []
    for (var j = 0; j < a.length; ++j) {
        collect[`${temp}`] = { "answer": a[j], "Count": b[j] }
        console.log(collect)
        if (bucket.indexOf(collect) == -1)
            bucket.push(collect)
    }
    //console.log(bucket)
    return bucket
}