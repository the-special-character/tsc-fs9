import { loadCart, success } from '../constants/actionTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case `${loadCart}_${success}`:
      return payload;

    default:
      return state;
  }
};
