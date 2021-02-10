import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import products from '../products'

const Homepage = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} lg={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row> 
    </>
  )
}

export default Homepage
