import React from 'react'

const Payment = ({ order, totalPrice, handleClick }) => {
  return (
    <button 
      type="button"
      className="btn btn-primary btn-block"
      disabled={order.orderItems === 0}
      onClick={handleClick}
      role="link"
    >
      Pay ${totalPrice}
    </button>
  )
}

export default Payment