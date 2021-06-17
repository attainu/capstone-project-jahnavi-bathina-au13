const express = require('express');
const { requireSignin } = require('../controllers/auth');
const Postcontroller = require("../controllers/PostController");
const {Photo}= require("../controllers/PostController");
const { userById } = require('../controllers/userController');
const validators = require("../validators/index");
const {singlePost} = require('../controllers/PostController')



const router = express.Router();

router.get('/posts',Postcontroller.Getposts);
router.post('/post/new/:userId',requireSignin,Postcontroller.CreatePost,validators.createPostValidators);
router.get('/posts/by/:userId',requireSignin, Postcontroller.postsByUser);
router.get('/post/:postId', singlePost);
router.put("/post/:postId", requireSignin, Postcontroller.isPoster,Postcontroller.updatePost );
router.delete('/post/:postId', requireSignin, Postcontroller.isPoster, Postcontroller.deletePost );
//photo
router.get("/post/photo/:postId", Photo)


// any route containing :userId, in app will first executes userById().
router.param("userId", userById)
// any route containing :postId, in app will first executes postById().
router.param("postId", Postcontroller.postById)

module.exports = router;
