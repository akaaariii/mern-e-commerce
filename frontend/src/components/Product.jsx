import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 ronded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title className="text-black">{product.name}</Card.Title>
        </Link>
        <Card.Text as="h4">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
