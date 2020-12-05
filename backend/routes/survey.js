const express = require('express');
const router = express.Router();
const {surveyById,storeResult, createSurvey, storeQuestions, getResponse, getSurvey, getSurveyByOwner, getSurveyQuesitons, getResponceCount,getResponceCountOld, storeOneQuestion} = require('../controller/survey');
const { authenticate, authorize, requireSignin } = require('../controller/user');

router.post('/getResponse', requireSignin, getResponse)//redundant  

router.get('/getSurveyQuesitons/:Sid', getSurveyQuesitons)
router.post('/getResponceCount', getResponceCount)
router.get('/getSurvey/:Sid', getSurvey)


router.param('Sid', surveyById);

module.exports = router;