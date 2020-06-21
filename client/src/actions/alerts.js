import * as actionTypes from './actionTypes';

export const returnErrors = (msg, status) => dispatch => {
  dispatch ({
    type: actionTypes.GET_ERRROS,
    payload: {msg, status}
  });
};