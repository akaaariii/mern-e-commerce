import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Payment from '../components/Payment';
import { Col, ListGroup, Row, Card} from 'react-bootstrap';


const PlaceOrderpage = () => {
  const cart = useSelector(state => state.cart);

  const totalPrice = cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, 
                {cart.shippingAddress.city}, 
                {cart.shippingAddress.postalCode}, 
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? 'Your cart is empty' : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <img src={item.image} alt={item.name} className="rounded" />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`} className="text-dark">{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Order Summary</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
              <Payment cart={cart} totalPrice={totalPrice} />
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
      <Link to="/payment" className="text-dark">&lt; Return to PAYMENT</Link>
    </>
  )
}

export default PlaceOrderpage
