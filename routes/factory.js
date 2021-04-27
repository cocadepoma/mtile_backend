
const { Router } = require('express');
const {
    getFactories,
    getSections,
    getNumbers,
    getMachines,
    getDocs
} = require('../controllers/factory');


const router = Router();

router.get('/factories', getFactories);
router.get('/sections', getSections);
router.get('/numbers', getNumbers);
router.get('/machines', getMachines);
router.get('/docs', getDocs);


module.exports = router;