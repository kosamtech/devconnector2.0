import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import posts from './posts';
import alerts from './alerts';
import messages from './messages'

export default combineReducers({
  auth,
  profile,
  posts,
  alerts,
  messages
});