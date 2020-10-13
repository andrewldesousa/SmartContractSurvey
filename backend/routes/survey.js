const express = require('express');
const router = express.Router();
const {surveyById,storeResult, createSurvey, storeQuestions, getResponse, getSurvey, getSurveyByOwner, getSurveyQuesitons, getResponceCount, storeOneQuestion} = require('../controller/survey');
const { authenticate, authorize, requireSignin } = require('../controller/user');

router.post('/storeResult',storeResult);
router.post('/createSurvey', requireSignin, authenticate, createSurvey);
router.post('/storeQuestions', requireSignin, storeQuestions)
router.post('/storeOneQuestions', requireSignin, storeOneQuestion)

router.post('/getResponse', requireSignin, getResponse)//redundant  

router.get('/getSurveyQuesitons/:Sid', getSurveyQuesitons)
router.get('/getResponceCount/:Sid', getResponceCount)
router.get('/getSurvey/:Sid', getSurvey)


router.param('Sid', surveyById);

module.exports = router;