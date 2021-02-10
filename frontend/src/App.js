import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import Productpage from './pages/Productpage'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="container py-3">
        <Route exact path="/" component={Homepage} />
        <Route exact path="/product/:id" component={Productpage} />
      </main>
      <Footer /> 
    </Router>
  )
}

export default App
