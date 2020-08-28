exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Name is required').notEmpty();
    req.check('email', 'Email must be between 3 to 320 characters')
        .matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        .withMessage('Email invalid')
        .isLength({
            min: 4,
            max: 320
        });
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({min: 8})
        .withMessage('Password must contain at least 8 characters')
        .matches(/\d/)
        .withMessage('Password must contain at least one digit');
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    next();
};
