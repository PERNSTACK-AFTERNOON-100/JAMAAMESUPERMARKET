const express  = require('express');
const router = express.Router();
const productsController = require('../Controllers/productsController')
router.get('/all',productsController.getAll)
router.get('/finProducts/:getById',productsController.FindProducts)
router.post('/new',productsController.newProduct)
router.put('/updated/:updateById',productsController.updateProducts)
router.delete('/delete/:deleteById',productsController.deleteProduct)


module.exports = router