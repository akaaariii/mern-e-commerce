import { combineReducers } from 'redux';

import { productListReducer, productDetailsReducer } from './productReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './orderReducer';

export default combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
});
