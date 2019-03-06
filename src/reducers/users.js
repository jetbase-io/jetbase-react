import { camelizeKeys } from 'humps';

import {
  REQUEST_USERS, RECEIVE_USERS, RECEIVE_USER,
} from '../actions/users';

const reducer = (state = {
  items: [],
  loading: false,
}, action) => {
  switch (action.type) {
    case REQUEST_USERS:
      return { ...state, loading: true };
    case RECEIVE_USERS:
      return { ...state, items: camelizeKeys(action.json.data), loading: false };
    case RECEIVE_USER:
      return {
        ...state,
        items: state.items.map(user => (user.id === action.json.id ? action.json : user)),
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
