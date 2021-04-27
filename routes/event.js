
const { Router } = require('express');
const {
    getEvents, getBreakdowns, getTypes
} = require('../controllers/event');


const router = Router();

router.get('/events', getEvents);
router.get('/breakdowns', getBreakdowns);
router.get('/types', getTypes);


module.exports = router;