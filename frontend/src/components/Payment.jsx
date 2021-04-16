import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

import * as actions from '../actions/authAction';

const Payment = ({ handleToken, cart, totalPrice }) => {
  return (
    <StripeCheckout
      name="NatLeather"
      description="Please proceed your payment"
      amount={totalPrice * 100}
      token={(token) => handleToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_PUB_KEY}
    >
      <button type="button" className="btn btn-dark btn-block" disabled={cart.cartItems === 0}>
        Place Order
      </button>
    </StripeCheckout>
  )
}

export default connect(null, actions)(Payment)