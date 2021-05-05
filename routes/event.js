
const { Router } = require('express');
const { check } = require('express-validator');

const {
    getEvents,
    getBreakdowns,
    getTypes,
    addEvent,
    updateEvent,
    removeEvent,
    addEventOperation,
    addEventClock,
    addEventItem,
    deleteEventItem,
    deleteEventOperation,
    deleteEventClock,
} = require('../controllers/event.controller');

const { checkFields } = require('../middlewares/check_fields');
const { validatorJWT } = require('../middlewares/jwt_validator');
const {
    factoryIdExists,
    sectionIdExists,
    machineIdExists,
    numberIdExists,
    technicianIdExists,
    orderTypeIdExists,
    breakdownIdExists,
    eventIdExists } = require('../middlewares/db_middlewares');

const router = Router();


// EVENTS ROUTES //
router.get('/events', validatorJWT, getEvents);

router.post('/events', [
    validatorJWT,
    factoryIdExists,
    sectionIdExists,
    machineIdExists,
    numberIdExists,
    technicianIdExists,
    check('worker', 'The worker is required').not().isEmpty(),
    orderTypeIdExists,
    breakdownIdExists,
    check('start', 'The start is required').not().isEmpty(),
    check('end', 'The end is required').not().isEmpty(),
    check('startFix', 'The startFix is required').not().isEmpty(),
    check('endFix', 'The endFix is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    checkFields
], addEvent);


router.put('/events/:id', [
    validatorJWT,
    eventIdExists,
    factoryIdExists,
    sectionIdExists,
    machineIdExists,
    numberIdExists,
    technicianIdExists,
    check('worker', 'The worker is required').not().isEmpty(),
    orderTypeIdExists,
    breakdownIdExists,
    check('start', 'The start is required').not().isEmpty(),
    check('end', 'The end is required').not().isEmpty(),
    check('startFix', 'The startFix is required').not().isEmpty(),
    check('endFix', 'The endFix is required').not().isEmpty(),
    check('totalMins', 'The totalMins is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    checkFields
], updateEvent);


router.delete('/events/:id', [validatorJWT, eventIdExists], removeEvent);



// EVENTS_OPERATIONS //
router.post('/operation/:id', [
    validatorJWT,
    eventIdExists,
    check('time', 'The time is required').not().isEmpty(),
    check('operation', 'The operation is required').not().isEmpty(),
    checkFields
], addEventOperation);

router.delete('/operation/:id', [
    validatorJWT,
    eventIdExists,
    checkFields
], deleteEventOperation);


// EVENTS_CLOCKS //
router.post('/clock/:id', [
    validatorJWT,
    eventIdExists,
    check('userId', 'The userId is required').not().isEmpty(),
    check('user', 'The user is required').not().isEmpty(),
    check('start', 'The start is required').not().isEmpty(),
    check('end', 'The end is required').not().isEmpty(),
    checkFields
], addEventClock);

router.delete('/clock/:id', [
    validatorJWT,
    eventIdExists,
    checkFields
], deleteEventClock);


// EVENTS_ITEMS //
router.post('/item/:id', [
    validatorJWT,
    eventIdExists,
    check('code', 'The item code is required').not().isEmpty(),
    check('description', 'The item description is required').not().isEmpty(),
    check('quantity', 'The item quantity is required').not().isEmpty(),
    checkFields
], addEventItem);

router.delete('/item/:id', [
    validatorJWT,
    eventIdExists,
    checkFields
], deleteEventItem);




router.get('/breakdowns', validatorJWT, getBreakdowns);
router.get('/types', validatorJWT, getTypes);


module.exports = router;