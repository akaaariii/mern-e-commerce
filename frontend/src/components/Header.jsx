import React from 'react'

const Header = () => {
  return (
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a class="navbar-brand" href="/">Love Leather</a>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/cart">Cart</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login">Sign In</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
