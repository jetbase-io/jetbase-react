import { combineReducers } from 'redux';
import account from './account';
import errors from './errors';
import users from './users';

export default combineReducers({
  account,
  errors,
  users,
});
