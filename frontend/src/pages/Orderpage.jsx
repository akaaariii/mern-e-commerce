import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Payment from '../components/Payment';
import Message from '../components/Message';
import spinner from '../assets/images/spinner.gif';
import { Col, ListGroup, Row, Card} from 'react-bootstrap';
import { getOrderDetails } from '../actions/orderAction';
import styled from 'styled-components';

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY);



const Orderpage = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    if(!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, orderId]);

  const handleClick = async (event) => {
    const stripe = await stripePromise;
    const response = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
    });
    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <>
      {loading ? <Spinner src={spinner} />
       : error ? <Message variant="danger">{error}</Message>
       : <>
          <h1>Your Order : {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong>{order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>{order.user.email}
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city}{' '} 
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                  </p>
                </ListGroup.Item>
  
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="secondary">Not Paid</Message>
                  )}
                </ListGroup.Item>
  
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? 'Order is empty' : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
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
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    {/* <Payment order={order} totalPrice={order.totalPrice} handleClick={handleClick} /> */}
                    <button 
                      type="button"
                      className="btn btn-primary btn-block"
                      disabled={order.orderItems === 0}
                      onClick={handleClick}
                      role="link"
                    >
                      Pay ${order.totalPrice}
                    </button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      }
    </>
  )
}

export default Orderpage


const Spinner = styled.img`
  margin: auto;
`;