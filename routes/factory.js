
const { Router } = require('express');
const {
    getFactories,
    getSections,
    getNumbers,
    getMachines,
    getDocs
} = require('../controllers/factory.controller');
const { validatorJWT } = require('../middlewares/jwt_validator');


const router = Router();

router.get('/factories', validatorJWT, getFactories);
router.get('/sections', validatorJWT, getSections);
router.get('/numbers', validatorJWT, getNumbers);
router.get('/machines', validatorJWT, getMachines);
router.get('/docs', validatorJWT, getDocs);


module.exports = router;