import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
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
            <li className="nav-item">
              <Link className="nav-link" to="/login"><i className="fas fa-user"></i> Sign In</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
