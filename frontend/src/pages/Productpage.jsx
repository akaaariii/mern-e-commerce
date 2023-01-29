import React, { useState, useEffect } from 'react'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Col, Form, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productAction'
import { addToCart } from '../actions/cartAction';
import spinner from '../assets/images/spinner.gif'
import styled from 'styled-components'


const Productpage = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productId = match.params.id
  
  useEffect(() => {
    dispatch(listProductDetails(productId))
  }, [dispatch, productId])

  const addToCartHandler = () => {
    dispatch(addToCart(productId, qty))
    history.push(`/cart/${productId}?qty=${qty}`)
  }

  return (
    <>
      <Link className="btn btn-outline-secondary my-3" to="/">Go Back</Link>
      {loading ? (
        <Spinner src={spinner} />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={5} className="mb-3">
            <img src={product.image} alt={product.name} />
          </Col>

          <Col md={4}>
            <h2>{product.name && product.name.toUpperCase()}</h2><hr />
            <p>{product.description}</p>
            <Rating 
              value={product.rating} 
              text={`${product.numReviews} reviews`}
            /><br />
            <p>Price: ${product.price}</p>
          </Col>
          
          <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <button 
                    onClick={addToCartHandler} 
                    type="button" 
                    className="btn btn-dark btn-lg btn-block"
                    disabled={product.countInStock === 0}  
                  >
                    Add to Cart - ${product.price}
                  </button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default Productpage


const Spinner = styled.img`
  margin: auto;
`;