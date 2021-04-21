const Order = require('../models/orderModel');
const asyncHandler = require('express-async-handler');

exports.addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if(orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return
  } else {
    const order = new Order({
      orderItems, 
      user: req.user._id,
      shippingAddress, 
      paymentMethod, 
      totalPrice
    });

    const createdOrder = await order.save();
    res.status(200).json(createdOrder);
  }
});