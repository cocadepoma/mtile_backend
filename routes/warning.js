const { Router } = require('express');
const { check } = require('express-validator');
const { getWarnings, addWarning, deleteWarning } = require('../controllers/warning');
const { validatorJWT } = require('../middlewares/jwt_validator');
const { checkFields } = require('../middlewares/check_fields');


const router = Router();

// Get all the warnings
router.get('/', [
    validatorJWT,
], getWarnings);

// Add a new warning
router.post('/', [
    check('description', 'Description field is required').not().isEmpty(),
    check('description', 'Description field must be at least 10 characters long').isLength({ min: 10 }),
    validatorJWT,
    checkFields
], addWarning);

// Delete a warning
router.delete('/:id', [
    validatorJWT,
], deleteWarning);



module.exports = router;
