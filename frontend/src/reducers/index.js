import { combineReducers } from 'redux';

import { productListReducer, productDetailsReducer } from './productReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';

export default combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  cart: cartReducer
});
