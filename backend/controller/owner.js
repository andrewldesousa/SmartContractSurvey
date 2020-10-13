


//this funciton needs to be resolved 
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