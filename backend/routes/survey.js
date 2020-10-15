const express = require('express');
const router = express.Router();
const {surveyById,storeResult, createSurvey, storeQuestions, getResponse, getSurvey, getSurveyByOwner, getSurveyQuesitons, getResponceCount, storeOneQuestion} = require('../controller/survey');
const { authenticate, authorize, requireSignin } = require('../controller/user');

router.post('/getResponse', requireSignin, getResponse)//redundant  

router.get('/getSurveyQuesitons/:Sid', getSurveyQuesitons)
router.get('/getResponceCount/:Sid', getResponceCount)
router.get('/getSurvey/:Sid', getSurvey)


router.param('Sid', surveyById);

module.exports = router;