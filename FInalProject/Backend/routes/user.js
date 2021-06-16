const express = require('express');
const { 
    userById, 
    allUsers, 
    getUser, 
    updateUser ,
    deleteUser, 
    userPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower,
    findPeople
} = require('../controllers/userController');
const { requireSignin } = require('../controllers/auth');


const router = express.Router();
//Follow and unFollow
router.put('/user/follow',requireSignin, addFollowing, addFollower )
router.put('/user/unfollow',requireSignin, removeFollowing, removeFollower )

router.get('/users',allUsers);
router.get('/user/:userId', requireSignin,getUser);
router.put('/user/:userId', requireSignin, updateUser);
router.delete("/user/:userId", requireSignin,deleteUser);
//photo
router.get("/user/photo/:userId", userPhoto);

//who to follow
router.get('/user/findpeople/:userId', requireSignin, findPeople)

// any route containing :userId, in app will first executes userById().
router.param("userId", userById)

module.exports = router;
 