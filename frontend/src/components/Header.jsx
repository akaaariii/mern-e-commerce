import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Header = ({ auth }) => {
  const [userState, setUserState] = useState(null);

  useEffect(() => {
    // console.log(auth);
    setUserState(auth);
  }, [auth])


  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">NatLeather</Link>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart"><i className="fas fa-shopping-cart"></i> Cart</Link>
            </li>

            {userState ? (
              <li className="nav-item">
                <a className="nav-link" href="/api/auth/logout"><i className="fas fa-user"></i> Logout</a>
              </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/api/auth/google"><i className="fas fa-user"></i> Login</a>
              </li>
            )}
            
          </ul>
        </div>
      </nav>
    </header>
  )
}

const mapStateToProps = ({ auth: { user }}) => {
  return { auth: user }
}

export default connect(mapStateToProps)(Header)
