const express = require('express');
const { requireSignin } = require('../controllers/auth');
const Postcontroller = require("../controllers/PostController");
const { userById } = require('../controllers/userController');
const validators = require("../validators/index")



const router = express.Router();
router.get('/posts',Postcontroller.Getposts);
router.post('/post/new/:userId',requireSignin,Postcontroller.CreatePost,validators.createPostValidators);
router.get('/posts/by/:userId',requireSignin, Postcontroller.postsByUser);
router.put('/post/:postId', requireSignin, Postcontroller.isPoster,Postcontroller.updatePost );
router.delete('/post/:postId', requireSignin, Postcontroller.isPoster, Postcontroller.deletePost );



// any route containing :userId, in app will first executes userById().
router.param("userId", userById)
// any route containing :postId, in app will first executes postById().
router.param("postId", Postcontroller.postById)

module.exports = router;
