const Order = require('../models/orderModel');
const asyncHandler = require('express-async-handler');

exports.addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if(orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
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

exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if(order) {
    res.json(order)
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

exports.updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if(order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // PaymentResult is coming from stripe
    order.paymentResult = {
      id: req.body.id,
      payment_status: req.body.payment_status,
      customer_email: req.body.payer.customer_email,
    }

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});