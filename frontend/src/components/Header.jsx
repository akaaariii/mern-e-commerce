import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Navbar } from 'react-bootstrap';

const Header = ({ auth }) => {
  const [userState, setUserState] = useState(null);

  useEffect(() => {
    console.log(auth);
    setUserState(auth);
  }, [auth])


  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg">
        <div className="container">
          <Link className="navbar-brand" to="/">NatLeather</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart"><i className="fas fa-shopping-bag"></i> Cart</Link>
              </li>
  
              {userState ? (
                <li className="nav-item">
                  <a className="nav-link" href="/api/auth/logout"><i className="fas fa-user"></i> Logout</a>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login"><i className="fas fa-user"></i> Login</Link>
                </li>
              )}
              
            </ul>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  )
}

const mapStateToProps = ({ auth: { user }}) => {
  return { auth: user }
}

export default connect(mapStateToProps)(Header)
