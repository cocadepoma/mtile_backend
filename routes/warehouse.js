const { Router } = require('express');
const { getItems, addItem, updateItem, deleteItem } = require('../controllers/warehouse');


const router = Router();


router.get('/', getItems);
router.post('/', addItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);


module.exports = router;
