import React from 'react'

const Loginpage = () => {
  return (
    <>
      <h2 className="text-center">Not logged in, please log in to continue</h2>
      <div className="text-center"><a href="/api/auth/google" className="text-warning">Login Now</a></div>
    </>
  )
}

export default Loginpage
