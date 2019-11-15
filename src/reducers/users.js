import { camelizeKeys } from 'humps';
import { normalize, schema } from 'normalizr';

import {
  REQUEST_USERS, RECEIVE_USERS, RECEIVE_USER,
} from '../actions/users';

const userSchema = new schema.Entity('users');

const reducer = (state = {
  items: {},
  loading: false,
}, action) => {
  switch (action.type) {
    case REQUEST_USERS:
      return { ...state, loading: true };
    case RECEIVE_USERS: {
      const { entities } = normalize(action.json, [userSchema]);
      return { ...state, items: camelizeKeys(entities.users), loading: false };
    }
    case RECEIVE_USER:
      return {
        ...state,
        items: { ...state.items, [action.json.id]: camelizeKeys(action.json) },
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
