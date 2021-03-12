const Survey = require('../models/survey')
const Question = require('../models/question')
const Response = require('../models/response')
const { errorHandler } = require('../helpers/dbErrorHandler')
const User = require('../models/user')

/*
    Search for the survey according to the param surveyId
    Set req.survey to that survey object of found
 */
exports.surveyById = (req, res, next, id) => {
    Survey.findById(id)
        .populate('owner')
        .exec((err, survey) => {
            if (!survey) return res.status(400).json({error: 'Survey not found'});
            if (err) return errorHandler(res, err)
            req.survey = survey;
            next();
        });
};


// Getting data from the server

//this is redundant  
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

exports.getSurvey = (req, res, next) => {
    Survey.find({ '_id': req.survey._id }, function (err, data) {
        if (err) console.log(err)
        if (!data) {
            return res.status(400).json({ err });
        }
        const temp = {
            "description":data[0].description,
            "title":data[0].title,
            "sections":data[0].sections
        }
        res.json(temp)
    })
}

exports.getSurveyQuesitons = (req, res, next) => {
    Question.find({ 'survey_id': req.survey._id }, function (err, data) {
        if (err) console.log(err)
        if (!data) {
            return res.status(400).json({ err });
        }
        var sectionedData=[]
        for (var i=0;i<data.length;++i){
            if(sectionedData[data[i].section]==null){
                console.log('flag')
                sectionedData[data[i].section]=[data[i]];    
            }
            else
                sectionedData[data[i].section][sectionedData[data[i].section].length]=data[i]
        }
        res.json(sectionedData)
        next()
    })
}

exports.getResponceCount = (req, res) => {
    console.log("survey_id")
    console.log(req.body)
    Question.find({ 'survey_id': req.body.survey_id}, { '_id': 1 , 'question' : 1}, function (err, data) {
        if (err) console.log(err)
        if (!data) {
            return res.status(400).json({ err });
        }
       
    }).then(function (data) {
        console.log(data)
        var dataList=[]
        var titleList=[]
        for (i in data){
            dataList.push(data[i]['_id'])
            titleList.push(data[i]['question'])
        }
        Response.aggregate(
            [
                { $match: { 'question_id': {$in:dataList} } },
                { 
                    $lookup: { 
                        from: 'questions', 
                        localField: 'question_id', 
                        foreignField: '_id', 
                        as: 'question' 
                    } 
                },
                { $group: { _id: {Qid : '$question_id' ,Question : '$question.question', Type : '$question.type', answer:'$answer'}, count: { $sum: 1 } } }
            ],
            function (err1, data1) {
                
                if (err1) console.log(err1)
                if (!data1) {
                    return res.status(400).json({ err1 });
                }
                else{
                    res.json(data1)
                }
            }
        )
    })
}


exports.getResponceCountOld = (req, res) => {
    Question.find({ 'survey_id': req.survey_id }, { '_id': 1 }, function (err, data) {
        if (err) console.log(err)
        if (!data) {
            return res.status(400).json({ err });
        }
    }).then(function (data) {
        console.log(data)
        var collect = {}
        for (var iter = 0; iter < data.length; ++iter) {
            var temp = data[iter]['_id']
            //console.log(getX(temp))
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
        //console.log(collect)
        if (bucket.indexOf(collect) == -1)
            bucket.push(collect)
    }
    //console.log(bucket)
    return bucket
}