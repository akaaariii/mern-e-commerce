import React from 'react'
import styled from 'styled-components'

const Loginpage = () => {
  return (
    <Wrapper>
      <h2 className="text-center">Not logged in, please log in to continue!</h2>
      <div className="text-center"><a href="/api/auth/google" className="text-warning">Login with Google</a></div>
    </Wrapper>
  )
}

export default Loginpage

const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
