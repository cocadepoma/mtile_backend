const { Router } = require('express');
const { getItems, addItem, updateItem, deleteItem } = require('../controllers/warehouse');
const { check } = require('express-validator');
const { validatorJWT } = require('../middlewares/jwt_validator');
const { checkFields } = require('../middlewares/check_fields');

const router = Router();


router.get('/', [
    validatorJWT,
], getItems);


router.post('/', [
    check('code', 'The code field is required').not().isEmpty(),
    check('description', 'The description field is required').not().isEmpty(),
    check('quantity', 'The quantity field is required').not().isEmpty(),
    check('minStock', 'The minStock field is required').not().isEmpty(),
    check('place', 'The place field is required').not().isEmpty(),
    validatorJWT,
    checkFields
], addItem);


router.put('/:id', [
    check('code', 'The code field is required').not().isEmpty(),
    check('description', 'The description field is required').not().isEmpty(),
    check('quantity', 'The quantity field is required').not().isEmpty(),
    check('minStock', 'The minStock field is required').not().isEmpty(),
    check('place', 'The place field is required').not().isEmpty(),
    validatorJWT,
    checkFields
], updateItem);


router.delete('/:id', [
    validatorJWT,
    checkFields
], deleteItem);


module.exports = router;
