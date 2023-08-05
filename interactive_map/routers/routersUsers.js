const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');
const { validateInputs } = require('../middleware/inputValidator');
const { deleteUserAdmin, editUserAdmin, getUserAdmin, getUsersAdmin } = require('../controllers/usersControllers');
const { createEditUserSchema } = require('../helpers/schemaUserValidator')

router.get('/', getUsersAdmin);

router.get('/:id', getUserAdmin);

router.put('/:id', [
    checkSchema(createEditUserSchema),
    validateInputs
],
    editUserAdmin);

router.delete('/:id', deleteUserAdmin);

module.exports = router;