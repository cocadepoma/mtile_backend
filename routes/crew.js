const { Router } = require('express');
const { check } = require('express-validator');
const { getTechnicians, addTechnician, updateTechnician, deleteTechnician } = require('../controllers/crew.controller');
const { checkFields } = require('../middlewares/check_fields');
const { technicianIdExists } = require('../middlewares/db_middlewares');
const { validatorJWT } = require('../middlewares/jwt_validator');


const router = Router();


router.get('/', validatorJWT, getTechnicians);

router.post('/', [
    validatorJWT,
    check('name', 'The technician name is required').not().isEmpty(),
    check('surname', 'The technician surname is required').not().isEmpty(),
    check('birthDate', 'The technician birthDate is required').not().isEmpty(),
    check('identityDocument', 'The technician identityDocument is not valid').isIdentityCard('ES'),
    check('phoneNumber', 'The technician phoneNumber is not valid').isMobilePhone('es-ES'),
    check('email', 'The technician email is not valid').not().isEmpty(),
    check('city', 'The technician city is required').not().isEmpty(),
    check('address', 'The technician address is required').not().isEmpty(),
    check('schedule', 'The technician schedule is required').not().isEmpty(),
    check('factory', 'The technician factory is required').not().isEmpty(),
    checkFields,
], addTechnician);


router.put('/:id', [
    validatorJWT,
    technicianIdExists,
    check('name', 'The technician name is required').not().isEmpty(),
    check('surname', 'The technician surname is required').not().isEmpty(),
    check('birthDate', 'The technician birthDate is required').not().isEmpty(),
    check('identityDocument', 'The technician identityDocument is not valid').isIdentityCard('ES'),
    check('phoneNumber', 'The technician phoneNumber is not valid').isMobilePhone('es-ES'),
    check('email', 'The technician email is not valid').not().isEmpty(),
    check('city', 'The technician city is required').not().isEmpty(),
    check('address', 'The technician address is required').not().isEmpty(),
    check('schedule', 'The technician schedule is required').not().isEmpty(),
    check('factory', 'The technician factory is required').not().isEmpty(),
    checkFields,
], updateTechnician);


router.delete('/:id', [
    validatorJWT,
    technicianIdExists,
], deleteTechnician);



module.exports = router;
