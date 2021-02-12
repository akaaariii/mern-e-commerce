import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Col, Row } from 'react-bootstrap'
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
  }, [])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link className="btn btn-outline-secondary my-3" to="/">Go Back</Link>
      <Row>
        <Col md={7}>
          <img src={product.image} alt={product.name} />
        </Col>
        <Col md={5}>
          <h2>{product.name}</h2><hr />
          <p>{product.description}</p>
          <h5>Price: ${product.price}</h5><br />
          <button onClick={addToCartHandler} type="button" className="btn btn-dark btn-lg btn-block">Add to Cart</button>
        </Col>
      </Row>
    </>
  )
}

export default Productpage
