const express = require('express');
const router = express.Router();
const {storeResult, createSurvey} = require('../controller/survey');
const { authenticate } = require('../controller/user');

router.post('/store',storeResult);
router.post('/createSurvey', authenticate, createSurvey);

module.exports = router;