import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartAction';
import { Col, ListGroup, Row, Form, Card} from 'react-bootstrap';
import styled from 'styled-components';


// @location   To get query string
const Cartpage = ({ match, location, history, auth }) => {
  const [userState, setUserState] = useState(null);
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  // console.log(location.search); -> ?qty=1

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;


  // To refresh the page if user done payment
  const reloadAfterCheckout = () => {
    if(window.name !== 'Donecheckout') {
      window.location.reload();
      window.name = 'Donecheckout';
    } else {
      window.name = '';
    }
  };


  useEffect(() => {
    setUserState(auth);
    reloadAfterCheckout();
    if(productId){
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty]);


  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    if(auth){
      history.push('/shipping');
    } else {
      history.push('/login');
    }
    // history.push('/login?redirect=shipping');
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
                <ListGroup.Item key={item.product}> {/* item.product is id */}
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
                      <FormControl
                        as='select'
                        value={item.qty}
                        onChange={(e) =>dispatch(addToCart(item.product, Number(e.target.value)))}
                      >
                        {[...Array(item.countInStock).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                    <Col md={2}>
                      <RemoveButton type="button" onClick={() => removeFromCartHandler(item.product)}>
                        Remove
                      </RemoveButton>
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
                <button type="button" className="btn btn-dark btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                  Proceed To Checkout
                </button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <br />

      {!(cartItems.length === 0) && <Link to="/" className="text-dark">&lt; Continue Shopping</Link>}
    </>
  )
}

const mapStateToProps = ({ auth: { user }}) => {
  return { auth: user }
}

export default connect(mapStateToProps)(Cartpage)


const RemoveButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: .8em;
`;

const FormControl = styled(Form.Control)`
  padding: 6px 12px;
`;