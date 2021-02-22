import React, { useState, useEffect } from 'react'
import Rating from '../components/Rating'
import axios from 'axios'
import { Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Productpage = ({ history, match }) => {
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
    }

    fetchProduct()
  }, [match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link className="btn btn-outline-secondary my-3" to="/">Go Back</Link>
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
              <ListGroup.Item>
              <button 
                onClick={addToCartHandler} 
                type="button" 
                className="btn btn-dark btn-lg btn-block"
                disabled={product.countInStock === 0}  
              >Add to Cart - ${product.price}</button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Productpage
