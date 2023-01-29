import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import { listProducts } from '../actions/productAction'
import spinner from '../assets/images/spinner.gif'
import styled from 'styled-components'


const Homepage = () => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])


  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Spinner src={spinner} />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : 
        <Row>
          {products.map((product) => (
            <Col key={product._id} lg={3} md={4} sm={6}>
              <Product product={product} />
            </Col>
          ))}
        </Row> 
      }
    </>
  )
}

export default Homepage


const Spinner = styled.img`
  margin: auto;
`;