import axios from 'axios';
import * as actionTypes from './actionTypes';
import { returnErrors } from './alerts';
import { createMessage } from './messages';

export const getCurrentProfile = () => async dispatch => {
  try {
    dispatch({ type: actionTypes.PROFILE_START });

    const res = await axios.get('/api/profile/me');

    dispatch({
      type: actionTypes.GET_PROFILE,
      payload: res.data
    });

  } catch (err) {
    dispatch({ type: actionTypes.PROFILE_ERROR})
    dispatch(returnErrors(err.response.data, err.response.status));
  }
}


export const getProfiles = () => async dispatch => {
  try {
    dispatch({ type: actionTypes.PROFILE_START });

    const res = await axios.get('/api/profile');

    dispatch({
      type:actionTypes.GET_PROFILES,
      payload: res.data
    });
    
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
}


export const getProfileById = userId => async dispatch => {
  try {
    dispatch({ type: actionTypes.CLEAR_PROFILE });

    dispatch({ type: actionTypes.PROFILE_START });

    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type:actionTypes.GET_PROFILE,
      payload: res.data
    });

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: actionTypes.PROFILE_ERROR });
  }
}

export const createProfile = (formData, history, edit=false) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const data = JSON.stringify(formData);

    const res = await axios.post('/api/profile', data, config);

    dispatch({
      type: actionTypes.GET_PROFILE,
      payload: res.data
    });

    dispatch(createMessage(edit ? {profileUpdated: 'Profile Updated'}: {profileCreated: 'Profile Created'}));

    if (!edit) {
      history.push('/dashboard');
    }

  } catch (err) {
    dispatch(returnErrors(err.response.data.errors[0], err.response.status));
  }
}


export const addExperience = (formData, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const data = JSON.stringify(formData);

  try {
    const res = await axios.put('/api/profile/experience', data, config);

    dispatch({
      type: actionTypes.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(createMessage({addExp: 'Experience details added'}))

    history.push('/dashboard');
    
  } catch (err) {
    dispatch(returnErrors(err.response.data.errors[0], err.response.status));
  }
}


export const addEducation = (formData, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const data = JSON.stringify(formData);

  try {
    const res = await axios.put('/api/profile/education', data, config);

    dispatch({
      type: actionTypes.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(createMessage({addEdu: 'Education details added'}));

    history.push('/dashboard');

  } catch (err) {
    dispatch(returnErrors(err.response.data.errors[0], err.response.status));
  }
}


export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({ 
      type: actionTypes.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(createMessage({ deleteExp: 'Experience removed'}));

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
}


export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({ 
      type: actionTypes.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(createMessage({ deleteEdu: 'Education removed'}));

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
}

export const deleteAccount = () => async dispatch => {
  if (window.confirm("Are you sure?")) {
    try {
      const res = await axios.delete('/api/profile');

      dispatch(returnErrors(res.data, 200));

      dispatch({
        type: actionTypes.ACCOUNT_DELETED
      });

    } catch (err) {
      dispatch(returnErrors(err.response.data, err.response.status));
    }
  }
}

export const deactivateAccount = () => async dispatch => {
  if (window.confirm("Are you sure?")) {
    try {
      const res = await axios.delete('/api/profile/deactivate');

      dispatch(returnErrors(res.data, 200));

      dispatch({
        type: actionTypes.ACCOUNT_DEACTIVATED
      });

    } catch (err) {
      dispatch(returnErrors(err.response.data, err.response.status));
    }
  }
}

export const getRepos = username => async dispatch => {
  try {

    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: actionTypes.GET_REPOS,
      payload: res.data
    });

  } catch (err) {
    dispatch(createMessage({NoProfile: 'No Profile on Github For This User'}));
  }
}