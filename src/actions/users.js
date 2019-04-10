import { decamelizeKeys } from 'humps';

import { authHeader, logout } from './account';
import { responseError } from './errors';
import { encodeParams } from '../helpers/user';

require('dotenv').config();

const ENV = process.env;

export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';

export const requestUsers = () => ({
  type: REQUEST_USERS,
});

export const receivedUsers = json => ({
  type: RECEIVE_USERS,
  json,
});

export const receivedUser = json => ({
  type: RECEIVE_USER,
  json,
});

export const createUser = params => (
  (dispatch) => {
    dispatch(requestUsers());
    const headers = authHeader();
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    const body = encodeParams(decamelizeKeys(params));
    return fetch(`${ENV.REACT_APP_API_SERVER}/users`, { method: 'POST', headers, body })
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
          dispatch(receivedUser(json));
        }
        return json;
      });
  }
);

export const deleteUser = id => (
  (dispatch) => {
    dispatch(requestUsers());
    return fetch(`${ENV.REACT_APP_API_SERVER}/users/${id}`, { method: 'DELETE', headers: authHeader() })
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
          dispatch(receivedUser(json));
        }
        return json;
      });
  }
);

export const fetchUsers = () => (
  (dispatch) => {
    dispatch(requestUsers());
    return fetch(`${ENV.REACT_APP_API_SERVER}/users`, { method: 'GET', headers: authHeader() })
      .then(
        response => (response.status === 200 ? response.json() : response),
        error => error,
      )
      .then((json) => {
        if (String(json).includes('TypeError')) {
          dispatch(responseError('Problems with server'));
          dispatch(receivedUsers([]));
        } else if (json.status === 401) {
          dispatch(logout());
          dispatch(receivedUsers([]));
        } else {
          dispatch(receivedUsers(json || []));
        }
        return json;
      });
  }
);

export const fetchUser = id => (
  (dispatch) => {
    dispatch(requestUsers());
    return fetch(`${ENV.REACT_APP_API_SERVER}/users/${id}`, { method: 'GET', headers: authHeader() })
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
          dispatch(receivedUser(json));
        }
        return json;
      });
  }
);

export const saveUser = (id, params) => (
  (dispatch) => {
    dispatch(requestUsers());
    const body = encodeParams(params);
    const headers = authHeader();
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return fetch(`${ENV.REACT_APP_API_SERVER}/users/${id}`, { method: 'PUT', headers, body })
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
          dispatch(receivedUser(json));
        }
        return json;
      });
  }
);
