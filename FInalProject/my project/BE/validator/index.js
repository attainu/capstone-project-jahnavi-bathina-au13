exports.createPostValidator=(req, res,next)=>{
    
    //title
    req.check('title', "Write a title").notEmpty()
    req.check('title','Title must be b/w 4-150 cha').isLength({
        min:4,
        max:150
    });


    //body
    req.check('body', "Write a body").notEmpty()
    req.check('body','Body must be b/w 4-2000 cha').isLength({
        min:4,
        max:2000
    });

// check error 

const errors = req.validationErrors()
if (errors){
    const firstError = errors.map((error)=>error.msg)[0];
    return res.status(400).json({error:firstError})
}
next();

};

exports.userSignupValidator =(req, res, next)=>{
    
    req.check("name", "Name is mandatory"). notEmpty();
    
    req.check("email","Email must be b/w 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Invalid email address")
    .isLength({
        min:4,
        max:200
    })

    req.check("password", "Name is mandatory"). notEmpty
    req.check("password")
    .isLength({min:6})
    .withMessage("Password must contain at least 6 character")
    .matches(/[0-9]/)
    .withMessage("Password must contain a number")


    // check error 

const errors = req.validationErrors()
if (errors){
    const firstError = errors.map((error)=>error.msg)[0];
    return res.status(400).json({error:firstError})
}
next();

};

exports.passwordResetValidator = (req, res, next) => {
    // check for password
    req.check("newPassword", "Password is required").notEmpty();
    req.check("newPassword")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 chars long")
        .matches(/\d/)
        .withMessage("must contain a number")
        .withMessage("Password must contain a number");
 
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware or ...
    next();
};



