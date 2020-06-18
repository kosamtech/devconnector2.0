import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import posts from './posts';
import users from './users';
import alerts from './alerts';

export default combineReducers({
  auth,
  users,
  profile,
  posts,
  alerts
})