const { Router } = require('express');
const { loginUser, renewToken, getUsers, addUser, updateUser, deleteUser } = require('../controllers/user');
const { check } = require('express-validator');
const { checkFields } = require('../middlewares/check_fields');

const { userIdExists, userEmailExists } = require('../middlewares/db_middlewares');
const { validatorJWT } = require('../middlewares/jwt_validator');

const router = Router();



// Login
router.post("/", [
    check("email", "The email is required").isEmail(),
    userEmailExists,
    check("password", "The password must be at least 6 characters").isLength({ min: 6 }),
    checkFields,
], loginUser);

// Renew Token
router.get("/renew", validatorJWT, renewToken);



// Get all the registered users
router.get('/', [
    validatorJWT,
    checkFields
], getUsers);


// Create a new user
router.post('/new', [
    validatorJWT,
    check('name', 'The name is required').isLength({ min: 4 }),
    check('email', 'The email must be a valid email address').isEmail(),
    userEmailExists,
    check('password', 'The password is required').isLength({ min: 6 }),
    checkFields
], addUser);


// Update an existing user
router.put('/:id', [
    validatorJWT,
    check('id', 'The id must be provided').not().isEmpty(),
    userIdExists,
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email must be a valid email address').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    checkFields
], updateUser);


// Delete an existing user
router.delete('/:id', [
    validatorJWT,
    check('id', 'The id must be provided').not().isEmpty(),
    userIdExists,
    checkFields
], deleteUser);

module.exports = router;
