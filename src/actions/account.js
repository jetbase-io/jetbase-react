import { get, post, put } from '../helpers/api';
import { currentUserId, userSession } from '../helpers/user';
import { responseError } from './errors';

require('dotenv').config();

const ENV = process.env;

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const REQUEST_ACCOUNT = 'REQUEST_ACCOUNT';
export const RECEIVE_ACCOUNT = 'RECEIVE_ACCOUNT';

const ENTITY_URL = `${ENV.REACT_APP_API_SERVER}/api/v1/users/${currentUserId()}`;

export const prepareHeader = () => {
  const headers = {};
  const user = JSON.parse(userSession());
  if (user && user.authdata) {
    headers.Authorization = `Bearer ${user.authdata}`;
  }
  headers['Content-Type'] = 'application/json';
  return headers;
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

export const catchErrorAccount = (dispatch, error) => {
  if (error.status === 401) {
    dispatch(logout());
  } else {
    error.json().then(body => dispatch(responseError(body.errors)));
  }
};

export const login = (email, password, keep) => (
  (dispatch) => {
    dispatch(requestLogin());
    return post(
      `${ENV.REACT_APP_API_SERVER}/api/v1/login`,
      prepareHeader(),
      { email, password },
      (json) => {
        dispatch(receivedLogin(json.id, json.token, json.permissions, keep));
        return json;
      },
      error => catchErrorAccount(dispatch, error),
    );
  }
);

export const changePassword = params => (
  (dispatch) => {
    dispatch(requestAccount());
    return put(
      `${ENTITY_URL}/password`,
      prepareHeader(),
      params,
      (json) => {
        dispatch(receivedAccount(json));
        return json;
      },
      error => catchErrorAccount(dispatch, error),
    );
  }
);

export const fetchAccount = () => (
  (dispatch) => {
    dispatch(requestAccount());
    return get(
      `${ENV.REACT_APP_API_SERVER}/api/v1/users/current`,
      prepareHeader(),
      (json) => {
        dispatch(receivedAccount(json));
        return json;
      },
      error => catchErrorAccount(dispatch, error),
    );
  }
);

export const saveAccount = params => (
  (dispatch) => {
    dispatch(requestAccount());
    return put(
      ENTITY_URL,
      prepareHeader(),
      params,
      (json) => {
        dispatch(receivedAccount(json));
        return json;
      },
      error => catchErrorAccount(dispatch, error),
    );
  }
);
