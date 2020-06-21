import * as actionTypes from './actionTypes';

export const createMessage = msg => dispatch => {
  dispatch ({
    type: actionTypes.CREATE_MESSAGE,
    payload: msg
  });
};