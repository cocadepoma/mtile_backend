const { Router } = require('express');
const {
    getItems,
    addItem,
    updateItem,
    deleteItem,
    subtractItem } = require('../controllers/warehouse.controller');
const { check } = require('express-validator');
const { validatorJWT } = require('../middlewares/jwt_validator');
const { checkFields } = require('../middlewares/check_fields');

const router = Router();


router.get('/', [
    validatorJWT,
], getItems);


router.post('/', [
    validatorJWT,
    check('code', 'The code field is required').not().isEmpty(),
    check('description', 'The description field is required').not().isEmpty(),
    check('quantity', 'The quantity field is required').not().isEmpty(),
    check('minStock', 'The minStock field is required').not().isEmpty(),
    check('place', 'The place field is required').not().isEmpty(),
    checkFields
], addItem);


router.put('/:id', [
    validatorJWT,
    check('code', 'The code field is required').not().isEmpty(),
    check('description', 'The description field is required').not().isEmpty(),
    check('quantity', 'The quantity field is required').not().isEmpty(),
    check('minStock', 'The minStock field is required').not().isEmpty(),
    check('place', 'The place field is required').not().isEmpty(),
    checkFields
], updateItem);

router.put('/subtract/:id', [
    validatorJWT,
    check('quantity', 'The quantity field is required').not().isEmpty(),
    checkFields
], subtractItem);

router.delete('/:id', [
    validatorJWT,
    checkFields
], deleteItem);


module.exports = router;
