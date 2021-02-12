import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './actions';

import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import Productpage from './pages/Productpage';
import Cartpage from './pages/Cartpage';
import Loginpage from './pages/Loginpage';


const App = ({ fetchUser }) => {

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <Router>
      <Header />
      <main className="container py-3">
        <Route exact path="/" component={Homepage} />
        <Route exact path="/product/:id" component={Productpage} />
        <Route exact path="/cart/:id?" component={Cartpage} />
        <Route exact path="/login" component={Loginpage} />
      </main>
      <Footer /> 
    </Router>
  )
}

export default connect(null, actions)(App)
