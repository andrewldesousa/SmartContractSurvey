const express = require('express');
const router = express.Router();
const {storeResult, createSurvey, storeQuestions, storeOneQuestion} = require('../controller/store');
const { authenticate, requireSignin } = require('../controller/user');

router.put('/storeResult', storeResult);
router.post('/storeQuestions', requireSignin, storeQuestions)
router.post('/createSurvey', requireSignin, authenticate, createSurvey);
router.post('/storeOneQuestion', requireSignin, storeOneQuestion)

module.exports = router;