import { userSession, encodeParams } from '../helpers/user';
import { responseError } from './errors';

require('dotenv').config();

const ENV = process.env;

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const REQUEST_ACCOUNT = 'REQUEST_ACCOUNT';
export const RECEIVE_ACCOUNT = 'RECEIVE_ACCOUNT';

const currentUserId = () => sessionStorage.getItem('currentUserId');

export const authHeader = () => {
  const user = JSON.parse(userSession());
  if (user && user.authdata) {
    return { Authorization: `Bearer ${user.authdata}` };
  }
  return {};
};

export const localLogin = (email, password, keep) => ({
  type: RECEIVE_LOGIN,
  email,
  password,
  keep,
});

export const requestLogin = () => ({
  type: REQUEST_LOGIN,
});

export const receivedLogin = (id, token, permissions, keep) => ({
  type: RECEIVE_LOGIN,
  id,
  token,
  keep,
  permissions,
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


export const logout = () => (
  (dispatch) => {
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    dispatch(requestLogout());
  }
);

export const login = (email, password, keep) => (
  (dispatch) => {
    dispatch(requestLogin());
    const body = encodeParams({ email, password });
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return fetch(`${ENV.REACT_APP_API_SERVER}/api/v1/login`, { method: 'POST', headers, body })
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
          dispatch(receivedLogin(json.id, json.token, json.permissions, keep));
        }
      });
  }
);

export const changePassword = params => (
  (dispatch) => {
    dispatch(requestAccount());
    const body = encodeParams(params);
    const headers = authHeader();
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return fetch(`${ENV.REACT_APP_API_SERVER}/api/v1/users/${currentUserId()}/password`, { method: 'PUT', headers, body })
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
    return fetch(`${ENV.REACT_APP_API_SERVER}/api/v1/users/${currentUserId()}`, { method: 'GET', headers: authHeader() })
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

export const saveAccount = params => (
  (dispatch) => {
    dispatch(requestAccount());
    const body = encodeParams(params);
    const headers = authHeader();
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return fetch(`${ENV.REACT_APP_API_SERVER}/api/v1/users/${currentUserId()}`, { method: 'PUT', headers, body })
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
