const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

// @desc   Create new order
// @route  POST /api/orders
router.post('/', orderController.addOrderItems);

// @desc   Get order by ID
// @route  GET /api/orders/:id
router.get('/:id', orderController.getOrderById);


module.exports = router;