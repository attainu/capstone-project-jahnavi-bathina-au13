const express = require('express');
// import socialLogin method from controllers/auth
const {
    signup,
    signin,
    signout,
    forgotPassword,
    resetPassword,
    socialLogin
} = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { userSignupValidator, passwordResetValidator } = require("../validator");


const router = express.Router();
// then use this route for social login
router.post("/social-login", socialLogin); 
// password forgot and reset routes
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);

router.post('/signup',userSignupValidator, signup);
router.post('/signin', signin);
router.post('/signout', signout);

router.param("userId", userById);

module.exports=router;