const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');
const { validateInputs } = require('../middleware/inputValidator');
const { createEditUserSchema } = require('../helpers/schemaUserValidator')
const {signIn, logOut, signUp, verifyAndRenewToken}=require('../controllers/authControllers')

router.post('/login', signIn);

router.post('/register',[
    checkSchema(createEditUserSchema),
    validateInputs
],

signUp );

router.get('/logout', logOut);

router.post('/token', verifyAndRenewToken);

module.exports = router;