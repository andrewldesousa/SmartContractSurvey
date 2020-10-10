const express = require('express');
const router = express.Router();
const {storeResult, createSurvey, storeQuestions, getResponse, getSurvey, getSurveyByOwner, getSurveyQuesitons, getResponceCount, storeOneQuestion} = require('../controller/survey');
const { authenticate, authorize, requireSignin } = require('../controller/user');

router.post('/storeResult',storeResult);
router.post('/createSurvey', requireSignin, authenticate, createSurvey);
router.post('/storeQuestions', requireSignin, storeQuestions)
router.post('/storeAllQuestions', requireSignin, storeOneQuestion)
router.get('/getResponse', requireSignin, getResponse)
router.get('/getSurveyQuesitons', getSurveyQuesitons)
router.get('/getResponceCount', requireSignin, getResponceCount)
router.get('/getSurvey', getSurvey)
router.get('/getSurveyByOwner', requireSignin, getSurveyByOwner)


module.exports = router;