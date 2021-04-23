const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const express = require('express');
const Order = require('../models/orderModel');
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
  // console.log(res.req.headers.referer)
  const baseUrl = res.req.headers.referer;
  const orderId = baseUrl.split('/')[4];

  const order = await Order.findById(orderId);
  const lineItems = order.orderItems.map((item) => ({
    price_data: {
      currency: 'cad',
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.qty,
  }))
  // console.log(lineItems)
  if(order) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${baseUrl}/success`,
      cancel_url: baseUrl,
      line_items: lineItems
    });
  
    // console.log('session', session)
    res.json({ id: session.id });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
}));


module.exports = router;
