const express  = require('express');
const router = express.Router();
const productsController = require('../Controllers/productsController')
router.get('/all',productsController.getAll)
router.get('/finProducts/:getById')
router.post('/new',productsController.newProduct)
router.put('/update/:updateById')


module.exports = router