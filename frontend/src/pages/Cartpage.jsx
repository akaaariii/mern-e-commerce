import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions';
import { Col, ListGroup, Row, Form, Card} from 'react-bootstrap';

const Cartpage = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  // console.log(qty);

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  // console.log(cartItems)

  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  }

  return (
    <>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? 
            <p>Your cart is empty <Link to="/">Go Back</Link></p>
            :
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={3}>
                      <img src={item.image} alt={item.name} className="rounded" />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`} className="text-dark">{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      ${item.price}
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <button className="btn btn-outline-secondary" type="button" onClick={() => removeFromCartHandler(item.product)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          }
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h4>
                Total: ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
              </ListGroup.Item>
              <ListGroup.Item>
                <button type="button" className="btn btn-warning btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                  Proceed To Checkout
                </button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <br />
      <Link to="/" className="text-dark">&lt; Continue Shopping</Link>
    </>
  )
}

export default Cartpage
