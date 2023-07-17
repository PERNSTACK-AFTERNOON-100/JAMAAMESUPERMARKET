const express = require('express');
const router = express.Router();
const orderItemsController= require('../Controllers/orderItemsController')
router.get('/all',orderItemsController.orderItems)

module.exports = router;