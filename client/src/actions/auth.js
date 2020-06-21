import axios from 'axios';
import * as actionTypes from './actionTypes';
import { returnErrors } from './alerts';
import setAuthToken from '../utils/setAuthToken';


export const loadUser = () => async dispatch => {
  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));

    setTimeout(() => {
      localStorage.removeItem('token');
    }, 3600 * 1000);
  }

  try {
    dispatch({ type: actionTypes.AUTH_START });

    const res = await axios.get('http://localhost:5000/api/auth');

    dispatch({
      type: actionTypes.USER_LOADED,
      payload: res.data
    });

  } catch (err) {
    dispatch(returnErrors(err.response.data.errors[0], err.response.status));
    dispatch({
      type: actionTypes.AUTH_ERROR
    });
  }
}

export const signup = ({ name, email, password }) => async dispatch =>  {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const data = JSON.stringify({ name, email, password });

  try {
    dispatch({
      type: actionTypes.AUTH_START
    });

    const res = await axios.post('http://localhost:5000/api/users', data, config);

    dispatch({
      type: actionTypes.SIGNUP_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());

  } catch (err) {
    dispatch(returnErrors(err.response.data.errors[0], err.response.status));
    dispatch({
      type: actionTypes.SIGNUP_FAIL
    });
  }
}


export const signin = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const data = JSON.stringify({ email, password });

  try {
    dispatch({ type: actionTypes.AUTH_START });

    const res = await axios.post('http://localhost:5000/api/auth', data, config);

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());

  } catch (err) {
    dispatch(returnErrors(err.response.data.errors[0], err.response.status));
    dispatch({
      type: actionTypes.LOGIN_FAIL
    });
  }
}

export const logout = () => dispatch => {
  dispatch({
    type: actionTypes.LOGOUT
  });
}