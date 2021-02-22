const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
// const dotenv = require('dotenv');


require('./models/userModel');
require('./services/passport');
const keys = require('./config/keys');

// dotenv.config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/authRoute');
const productRoutes = require('./routes/productRoute');
// const billingRoutes = require('./routes/billingRoute');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
// app.use('/api/stripe', billingRoutes);



if(process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend/build'))
  
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}


mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Server has start running on port ${PORT}`))
  })
  .catch(err => console.error(`Error: ${err.message}`))
