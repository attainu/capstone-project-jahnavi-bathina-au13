const express = require('express');
const {signup, signin, signout} = require("../controllers/auth");
const { userById } = require('../controllers/userController');
const validators = require("../validators/index")

const router = express.Router();

router.post('/signup',validators.userSignupValidators, signup)
router.post('/signin',signin);
router.get('/signout',signout);

// any route containing :userId, in app will first executes userById().
router.param("userId", userById)

module.exports = router;
 