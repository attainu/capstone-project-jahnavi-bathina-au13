exports.createPostValidators=(req, res, next)=>{
    req.check("title", "Please Write A title").notEmpty();
    req.check("title", "the length should be from 4 to 150 characters").isLength({
        min:4, max:150
    })
    req.check("body", "Please Write A body").notEmpty();
    req.check("body", "the length should be from 4 to 2000 characters").isLength({
        min:4, max:2000
    })

    const errors = req.validationErrors();
    if (errors){
        const firsterror = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firsterror})
    }
    next();

}
exports.userSignupValidators=(req, res, next)=>{

// name is not null and between 4-20 characters
    req.check("name","Name is required").notEmpty();
//Emai is not null and valid.
    req.check("email", "Email is not Valid")
    // these are regular expressions for email
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min:4,
        max:200
    })
    //check Password
    req.check("password","Password is required").notEmpty();
    req.check('password').isLength({min:6})
    .withMessage("Password must be at least 6 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain atleast one number")
    // check for errors
    const errors = req.validationErrors();
    if (errors){
        const firsterror = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firsterror})
    }
    next();

}


