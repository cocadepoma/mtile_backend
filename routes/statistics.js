const { Router } = require('express');
const { check } = require('express-validator');

const { validatorJWT } = require('../middlewares/jwt_validator');
const { checkFields } = require('../middlewares/check_fields');
const { getStatistics, getWeeks, getStatisticsBySectionWeek, getLastWeekByOrderType } = require('../controllers/statistics.controller');


const router = Router();

router.get('/', [
    validatorJWT,
], getStatistics);

router.get('/lastweekbyordertype', [
    validatorJWT,
], getLastWeekByOrderType);

router.get('/14dayssagobyweeks', [
    validatorJWT,
], getWeeks);

router.post('/section/:week', [
    validatorJWT,
    check('section', 'The section name is required').not().isEmpty(),
    checkFields
], getStatisticsBySectionWeek);





module.exports = router;


