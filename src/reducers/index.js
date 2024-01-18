import { combineReducers } from 'redux';
import products from './products.reducer';
import cart from './cart.reducer';
import loading from './loading.reducer';
import errors from './error.reducer';

export default combineReducers({
  products,
  cart,
  loading,
  errors,
});
