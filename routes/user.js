const { Router } = require('express');
const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/user');
const { check } = require('express-validator');
const { checkFields } = require('../middlewares/check_fields');
const { userIdExists, userEmailExists } = require('../helpers/db-helpers');

const router = Router();

router.get('/', [
    // validarJWT,
    checkFields
], getUsers);


router.put('/:id', [
    // validarJWT,
    check('id', 'The id must be provided').not().isEmpty(),
    check('id').custom(userIdExists),
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email must be a valid email address').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    checkFields
], updateUser);


router.post('/', [
    // validarJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email must be a valid email address').isEmail(),
    check('email').custom(userEmailExists),
    check('password', 'The password is required').not().isEmpty(),
    checkFields
], addUser);


router.delete('/:id', [
    // validarJWT,
    check('id', 'The id must be provided').not().isEmpty(),
    check('id').custom(userIdExists),
    checkFields
], deleteUser);

module.exports = router;
