const { validationResult } = require('express-validator');

const validateInputs = (req, res, next) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        res.errors = errors.array();

    }

    next();

};

module.exports = {
    validateInputs
}