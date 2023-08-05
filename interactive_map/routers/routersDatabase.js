const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');
const { validateInputs } = require('../middleware/inputValidator');
const { createEntry, deleteEntry, editEntry, getEntriesAdmin, getEntryAdmin, deleteEntriesByUserId } = require('../controllers/entriesController');
const { createEditEntrySchema } = require('../helpers/schemaEntryValidator')

router.get('/', getEntriesAdmin);


router.get('/:id', getEntryAdmin);

router.post('/', [
    checkSchema(createEditEntrySchema),
    validateInputs
],
    createEntry);

router.put('/:id', [
    checkSchema(createEditEntrySchema),
    validateInputs
],
    editEntry);

router.delete('/:id', deleteEntry);

router.delete('/users/:id', deleteEntriesByUserId);

module.exports = router;