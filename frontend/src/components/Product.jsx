import React from 'react'
import Rating from './Rating'
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
          <h6 className="text-dark">{product.name.toUpperCase()}</h6>
        </Link>
        <Rating 
          value={product.rating} 
          text={`${product.numReviews} reviews`}
        />
        <h6 className="pt-2">${product.price}</h6>
      </Card.Body>
    </Card>
  )
}

export default Product
