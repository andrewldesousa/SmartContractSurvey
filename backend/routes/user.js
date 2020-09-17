const express = require('express');
const router = express.Router();
const {test,signup,signin,signout,requireSignin,userById,read, authenticate, authorize} = require('../controller/user') 
const {submit} = require('../controller/user') 
const {userSignupValidator} = require('../helpers/validator')

router.post('/test',authenticate,authorize,requireSignin, test);
router.post('/signup',userSignupValidator,signup);
router.post('/signin',signin);
router.get('/signout',authenticate,requireSignin, signout);
router.get('/:userId',authenticate,requireSignin, read);
router.param('userId', userById);
//Temp till data storage is not implemented the defenation is in user 
router.post('/submit',submit);
//it needs to be replaced by a storage function

module.exports = router;