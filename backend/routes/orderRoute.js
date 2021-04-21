const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

// @desc   Create new order
// @route  POST /api/orders
router.post('/', orderController.addOrderItems);


module.exports = router;