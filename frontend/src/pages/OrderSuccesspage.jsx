import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const OrderSuccesspage = () => {

  // const getSessionObj = async () => {
  //   const response = await fetch("/api/stripe/webhook", {
  //     method: "POST",
  //   });
  //   const session = await response.json();
  //   console.log('session from success page', session)
  // }

  useEffect(() => {
    localStorage.removeItem('cartItems');
    // getSessionObj();
  }, []);

  return (
    <div className="text-center mt-5">
      <MsgContainer>
        <CheckIcon className="fas fa-check-circle"></CheckIcon>
        <h1>Payment Complete</h1>
      </MsgContainer>
      <h3 className="text-secondary">Thanks for your order!</h3>
      <br />
      <Link to="/" className="text-dark">&lt; Return to Home</Link>
    </div>
  )
}

export default OrderSuccesspage



const MsgContainer = styled.div`
  color: #5FC978;
`
const CheckIcon = styled.i`
  font-size: 3.5rem;
  margin-bottom: 12px;
`