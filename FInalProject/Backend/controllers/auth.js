const jwt = require("jsonwebtoken");
const User = require("../Models/UserSchema");
require('dotenv').config()
const expressJwt =  require('express-jwt');

exports.signup = async (req,res) =>{
    const userExists = await User.findOne({email: req.body.email})
    if (userExists) 
        return res.status(403).json({
            error:"Email already Exists"
        });
    const user = await new User(req.body)
    await user.save()
    res.status(200).json(
        {message:"signed in Successfully"}
        );
} 

exports.signin = (req,res)=>{
    // find the user based on email
    const{email,password} = req.body
    User.findOne({email}, (err, user)=>{
        //if err or no user
        if(err || !user){
            return res.status(401).json({
                error: "User Does not exist"
            })
        }
        // if user is found make sure the email and password are correct.
        // create authenticate method in model and use here
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and Password does not Match"
            })
        }
        //generate a token with user id and secret
        const token = jwt.sign({_id: user._id},process.env.JWT_SECRET)
        // persist the token as 'santos' in cookie with expiry date
        res.cookie("santos",token, {expire: new Date()+ 10000})
        //return response with user and token to frontend clinet.
        const {_id, name, email} = user
        return res.json(
            {
            token,
            user:{_id,email, name}
        });
    })

}

exports.signout=(req,res)=>{
    res.clearCookie("santos")
    return res.json({message:"SignOut Success."})
    
}

exports.requireSignin = expressJwt({
    // if the token is valid then, express jwt appends the verified users id
    // in an authKey to the request obj.
    secret:process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: "auth"
})
