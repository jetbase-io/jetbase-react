import {
  destroy,
  get,
  post,
  put,
} from '../helpers/api';

import { prepareHeader, logout } from './account';
import { responseError } from './errors';

require('dotenv').config();

const ENV = process.env;

const ENTITY_URL = `${ENV.REACT_APP_API_SERVER}/api/v1/users`;

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

export const catchErrorUsers = (dispatch, error) => {
  if (error.status === 401) {
    dispatch(logout());
  } else {
    dispatch(responseError(error));
  }
};


export const createUser = params => (
  (dispatch) => {
    dispatch(requestUsers());
    return post(
      ENTITY_URL,
      prepareHeader(),
      params,
      (json) => {
        dispatch(receivedUser(json));
        return json;
      },
      error => catchErrorUsers(dispatch, error),
    );
  }
);

export const deleteUser = id => (
  (dispatch) => {
    dispatch(requestUsers());
    return destroy(
      `${ENTITY_URL}/${id}`,
      prepareHeader(),
      (json) => {
        dispatch(receivedUser(json));
        return json;
      },
      error => catchErrorUsers(dispatch, error),
    );
  }
);

export const fetchUsers = () => (
  (dispatch) => {
    dispatch(requestUsers());
    return get(
      ENTITY_URL,
      prepareHeader(),
      (json) => {
        dispatch(receivedUsers(json.items));
        return json;
      },
      error => catchErrorUsers(dispatch, error),
    );
  }
);

export const fetchUser = id => (
  (dispatch) => {
    dispatch(requestUsers());
    return get(
      `${ENTITY_URL}/${id}`,
      prepareHeader(),
      (json) => {
        dispatch(receivedUser(json));
        return json;
      },
      error => catchErrorUsers(dispatch, error),
    );
  }
);

export const saveUser = (id, params) => (
  (dispatch) => {
    dispatch(requestUsers());
    return put(
      `${ENTITY_URL}/${id}`,
      prepareHeader(),
      params,
      (json) => {
        dispatch(receivedUser(json));
        return json;
      },
      error => catchErrorUsers(dispatch, error),
    );
  }
);
