const express = require('express');
const router = express.Router();
const {storeResult, createSurvey, storeQuestions, storeOneQuestion} = require('../controller/survey');
const { authenticate, requireSignin } = require('../controller/user');

router.put('/storeResult', storeResult);
router.post('/storeQuestions', requireSignin, storeQuestions)
router.post('/createSurvey', requireSignin, authenticate, createSurvey);
router.post('/storeOneQuestions', requireSignin, storeOneQuestion)//under testing

module.exports = router;