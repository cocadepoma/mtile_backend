const { Router } = require('express');
const { getTechnicians } = require('../controllers/crew');


const router = Router();


router.get('/', getTechnicians);



module.exports = router;
