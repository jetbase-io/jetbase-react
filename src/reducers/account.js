import {
  CHANGE_LANGUAGE,
  REQUEST_FORGOT,
  RECEIVE_FORGOT,
  REQUEST_RESET,
  RECEIVE_RESET,
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  REQUEST_LOGOUT,
  REQUEST_ACCOUNT,
  RECEIVE_ACCOUNT,
  REQUEST_SIGNUP,
  RECEIVE_SIGNUP,
} from '../actions/account';

const reducer = (state = {
  profile: {}, user: null, loading: false, loadingAccount: false, language: 'en',
}, action) => {
  const user = {};
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return { ...state, language: action.lang };
    case REQUEST_FORGOT:
      return { ...state, loading: true };
    case RECEIVE_FORGOT:
      return { ...state, loading: false };
    case REQUEST_RESET:
      return { ...state, loading: true };
    case RECEIVE_RESET:
      return { ...state, loading: false };
    case REQUEST_SIGNUP:
      return { ...state, loading: true };
    case RECEIVE_SIGNUP:
      return { ...state, loading: false };
    case REQUEST_LOGIN:
      return { ...state, loading: true };
    case RECEIVE_LOGIN:
      user.authdata = action.token;
      if (action.keep) {
        // localStorage.setItem('user', JSON.stringify(user));
      } else {
        // sessionStorage.setItem('user', JSON.stringify(user));
      }
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
