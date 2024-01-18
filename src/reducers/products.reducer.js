import { loadProducts, success } from '../constants/actionTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case `${loadProducts}_${success}`:
      return payload;

    default:
      return state;
  }
};
