const { Router } = require('express');
const { check } = require('express-validator');

const { validatorJWT } = require('../middlewares/jwt_validator');
const { checkFields } = require('../middlewares/check_fields');
const {
    getStatistics,
    getWeeks,
    getStatisticsBySectionWeek,
    getLastWeekByOrderType,
    getIntervencionsWeeks,
    getTotalTimeByWeek,
    getLastWeekByBreakdown,
    getLastWeekByTechnician
} = require('../controllers/statistics.controller');


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

router.get('/interventionsweeks', [
    validatorJWT,
], getIntervencionsWeeks);

router.get('/totaltimebyweek', [
    validatorJWT,
], getTotalTimeByWeek);

router.post('/section/:week', [
    validatorJWT,
    check('section', 'The section name is required').not().isEmpty(),
    checkFields
], getStatisticsBySectionWeek);

router.get('/lastweekbybreakdown', [
    validatorJWT,
], getLastWeekByBreakdown);

router.get('/lastweekbytechnician', [
    validatorJWT,
], getLastWeekByTechnician);



module.exports = router;


