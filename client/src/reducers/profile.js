import * as actionTypes from '../actions/actionTypes';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PROFILE_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.GET_PROFILE:
    case actionTypes.UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      }
    case actionTypes.GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      }
    case actionTypes.GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      }
    case actionTypes.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      }
    case actionTypes.PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        profile: null,
        repos: []
      }
    default:
      return state;
  }
};