import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Payment from '../components/Payment';
import Message from '../components/Message';
import { Col, ListGroup, Row, Card} from 'react-bootstrap';
import { createOrder } from '../actions/orderAction';


const PlaceOrderpage = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if(success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        totalPrice: cart.totalPrice,
      })
    )
  };

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
                {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.city}{' '} 
                {cart.shippingAddress.postalCode},{' '}
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
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error &&
                <ListGroup.Item>
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              }
              <ListGroup.Item>
                <button 
                  type="button" 
                  className="btn btn-dark btn-block" 
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place order
                </button>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                <Payment cart={cart} totalPrice={totalPrice} />
              </ListGroup.Item> */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Link to="/payment" className="text-dark">&lt; Return to PAYMENT</Link>
    </>
  )
}

export default PlaceOrderpage
