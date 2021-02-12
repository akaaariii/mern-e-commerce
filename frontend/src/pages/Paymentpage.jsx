import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { savePaymentMethod } from '../actions';
import CheckoutSteps from '../components/CheckoutSteps';


const Paymentpage = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if(!shippingAddress){
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('Stripe');
  
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <h1 style={{width: '60%', margin: 'auto'}} className="mb-3">Payment Method</h1>
      <Form onSubmit={submitHandler} style={{width: '60%', margin: 'auto'}}>
        <Form.Group>
        <legend>Selected Method</legend>
        <div className="col">
          <Form.Check type="radio" label="Stripe" id="Stripe" name="paymentMethod" value="Stripe" checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
        </div>
        </Form.Group>

        <button className="btn btn-secondary" type="submit">Continue</button>
      </Form>
    </>
  )
}

export default Paymentpage
