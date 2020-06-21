import * as actionTypes from '../actions/actionTypes';

const initialState = {
  msg: null,
  status: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ERRROS:
      return {
        ...state,
        msg: action.payload.msg,
        status: action.payload.status
      }
    default:
      return state;
  }
};