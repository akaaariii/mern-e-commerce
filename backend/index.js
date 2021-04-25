const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();

require('./models/userModel');
require('./services/passport');
const keys = require('./config/keys');


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
const orderRoutes = require('./routes/orderRoute');
const billingRoutes = require('./routes/billingRoute');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stripe', billingRoutes);



if(process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend/build'))
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server has start running on port ${PORT}`))