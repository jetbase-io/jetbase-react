import {
  REQUEST_LOGIN, RECEIVE_LOGIN, REQUEST_LOGOUT, REQUEST_ACCOUNT, RECEIVE_ACCOUNT,
} from '../actions/account';
import ability, { defineRulesFor } from '../ability';

const reducer = (state = {
  profile: {}, user: null, loading: false, loadingAccount: false,
}, action) => {
  const user = {};
  switch (action.type) {
    case REQUEST_LOGIN:
      return { ...state, loading: true };
    case RECEIVE_LOGIN:
      user.authdata = action.token;
      user.permissions = action.permissions;
      if (action.keep) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('currentUserId', action.id);
      } else {
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('currentUserId', action.id);
      }
      ability.update(defineRulesFor(action.permissions));
      return { ...state, user, loading: false };
    case REQUEST_LOGOUT:
      return { ...state, user: null };
    case REQUEST_ACCOUNT:
      return { ...state, loadingAccount: true };
    case RECEIVE_ACCOUNT:
      return { ...state, profile: action.json.data, loadingAccount: false };
    default:
      return state;
  }
};

export default reducer;
