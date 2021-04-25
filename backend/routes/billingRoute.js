const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const express = require('express');
const Order = require('../models/orderModel');
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.post('/create-checkout-session', asyncHandler(async (req, res) => {
  const baseUrl = res.req.headers.referer;
  const orderId = baseUrl.split('/')[4];

  let redirectBaseUrl;
  if(baseUrl.includes('heroku')) {
    redirectBaseUrl = `https://natleather.herokuapp.com/order/${orderId}`
  } else {
    redirectBaseUrl = `http://localhost:3000/order/${orderId}`
  }

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
      success_url: `${redirectBaseUrl}/success`,
      cancel_url: redirectBaseUrl,
      line_items: lineItems
    });
  
    // console.log('session', session)
    res.json({ id: session.id });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
}));

// router.post('/webhook', (req, res) => {
//   const event = req.body;

//   console.log('event', event);

//   if(event.type === 'checkout.session.completed') {
//     const session = event.data.opject;

//     console.log('session is', session);

//     res.send(200);
//   }
// });


module.exports = router;
