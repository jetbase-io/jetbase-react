import { userSession, encodeParams } from '../helpers/user';
import { responseError } from './errors';

require('dotenv').config();

const ENV = process.env;

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const REQUEST_FORGOT = 'REQUEST_FORGOT';
export const RECEIVE_FORGOT = 'RECEIVE_FORGOT';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const REQUEST_ACCOUNT = 'REQUEST_ACCOUNT';
export const RECEIVE_ACCOUNT = 'RECEIVE_ACCOUNT';
export const REQUEST_RESET = 'REQUEST_RESET';
export const RECEIVE_RESET = 'RECEIVE_RESET';
export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export const RECEIVE_SIGNUP = 'RECEIVE_SIGNUP';

const currentUserId = () => sessionStorage.getItem('currentUserId');

export const authHeader = () => {
  const user = JSON.parse(userSession());
  if (user && user.authdata) {
    return { authorization: `Bearer ${user.authdata}` };
  }
  return {};
};

export const localLogin = (email, password, keep) => ({
  type: RECEIVE_LOGIN,
  email,
  password,
  keep,
});

export const requestForgot = () => ({
  type: REQUEST_FORGOT,
});

export const receivedForgot = () => ({
  type: RECEIVE_FORGOT,
});

export const requestReset = () => ({
  type: REQUEST_RESET,
});

export const receivedReset = () => ({
  type: RECEIVE_RESET,
});

export const requestLogin = () => ({
  type: REQUEST_LOGIN,
});

export const receivedLogin = (token, keep) => ({
  type: RECEIVE_LOGIN,
  token,
  keep,
});

export const requestSignup = () => ({
  type: REQUEST_SIGNUP,
});

export const receivedSignup = token => ({
  type: RECEIVE_SIGNUP,
  token,
});

export const requestLogout = () => ({
  type: REQUEST_LOGOUT,
});

export const requestAccount = () => ({
  type: REQUEST_ACCOUNT,
});

export const receivedAccount = json => ({
  type: RECEIVE_ACCOUNT,
  json,
});


export const changeLanguageRequest = lang => ({
  type: CHANGE_LANGUAGE,
  lang,
});


export const changeLanguage = lang => (
  dispatch => dispatch(changeLanguageRequest(lang))
);


export const logout = () => (
  (dispatch) => {
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    dispatch(requestLogout());
  }
);

export const forgot = email => (
  (dispatch) => {
    dispatch(requestForgot());
    const body = encodeParams({ email });
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return fetch(`${ENV.REACT_APP_API_SERVER}/forgot`, { method: 'POST', headers, body })
      .then(
        response => response.json(),
        error => error,
      )
      .then((json) => {
        if (!json.success) {
          dispatch(responseError(json.message));
        } else {
          dispatch(receivedForgot());
        }
        return json;
      });
  }
);

export const resetPassword = (password, confirmPassword, token) => (
  (dispatch) => {
    dispatch(requestReset());
    const body = encodeParams({ password, confirmPassword });
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return fetch(`${ENV.REACT_APP_API_SERVER}/reset/${token}`, { method: 'POST', headers, body })
      .then(
        response => response.json(),
        error => error,
      )
      .then((json) => {
        if (!json.success) {
          dispatch(responseError(json.message));
        } else {
          dispatch(receivedReset());
        }
        return json;
      });
  }
);

export const login = (email, password, keep) => (
  (dispatch) => {
    dispatch(requestLogin());
    const body = encodeParams({ email, password });
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return fetch(`${ENV.REACT_APP_API_SERVER}/login`, { method: 'POST', headers, body })
      .then(
        response => (response ? response.json() : response),
        error => error,
      )
      .then((json) => {
        if (!json.success) {
          dispatch(responseError(json.message));
        } else {
          dispatch(receivedLogin(json.token, keep));
        }
      });
  }
);

export const signup = (email, password) => (
  (dispatch) => {
    dispatch(requestSignup());
    const body = encodeParams({ email, password });
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return fetch(`${ENV.REACT_APP_API_SERVER}/signup`, { method: 'POST', headers, body })
      .then(
        response => response.json(),
        error => error,
      )
      .then((json) => {
        if (!json.success) {
          dispatch(responseError(json.message));
        } else {
          dispatch(receivedSignup());
        }
        return json;
      });
  }
);

export const changePassword = params => (
  (dispatch) => {
    dispatch(requestAccount());
    const body = encodeParams(params);
    const headers = authHeader();
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return fetch(`${ENV.REACT_APP_API_SERVER}/users/${currentUserId()}/password`, { method: 'PUT', headers, body })
      .then(
        response => (response.status === 200 ? response.json() : response),
        error => error,
      )
      .then((json) => {
        if (String(json).includes('TypeError')) {
          dispatch(responseError('Problems with server'));
        } else if (json.status === 401) {
          dispatch(responseError('User or password incorrect'));
        } else {
          dispatch(receivedAccount(json));
        }
        return json;
      });
  }
);

export const fetchAccount = () => (
  (dispatch) => {
    dispatch(requestAccount());
    return fetch(`${ENV.REACT_APP_API_SERVER}/users/me`, { method: 'GET', headers: authHeader() })
      .then(
        response => (response.status === 200 ? response.json() : response),
        error => error,
      )
      .then((json) => {
        if (String(json).includes('TypeError')) {
          dispatch(responseError('Problems with server'));
        } else if (json.status === 401) {
          dispatch(logout());
        } else {
          dispatch(receivedAccount(json));
        }
        return json;
      });
  }
);

export const saveAccount = (params, token) => (
  (dispatch) => {
    dispatch(requestAccount());
    const body = encodeParams(params);
    const headers = {};
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return fetch(`${ENV.REACT_APP_API_SERVER}/signup/${token}`, { method: 'PATCH', headers, body })
      .then(
        response => response.json(),
        error => error,
      )
      .then((json) => {
        if (!json.success) {
          dispatch(responseError(json.message));
        } else {
          dispatch(receivedAccount(json));
        }
        return json;
      });
  }
);
