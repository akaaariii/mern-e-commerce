import { combineReducers } from 'redux';

import { productListReducer } from './productReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';

export default combineReducers({
  productList: productListReducer,
  auth: authReducer,
  cart: cartReducer
});
