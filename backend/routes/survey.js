const express = require('express');
const router = express.Router();
const {storeResult, createSurvey, storeQuestions, getResponse, getSurvey} = require('../controller/survey');
const { authenticate, authorize } = require('../controller/user');

router.post('/storeResult',storeResult);
router.post('/createSurvey',authenticate, createSurvey);
router.post('/storeQuestions',storeQuestions)
router.get('/getResponse',getResponse)
router.get('/getSurvey',getSurvey)


module.exports = router;