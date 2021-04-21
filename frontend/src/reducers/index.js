import { combineReducers } from 'redux';

import { productListReducer, productDetailsReducer } from './productReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import { orderCreateReducer } from './orderReducer';

export default combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer
});
