import { REQUEST_ERROR, RESET_ERROR } from '../actions/errors';

const reducer = (state = { status: '' }, action) => {
  switch (action.type) {
    case REQUEST_ERROR:
      return { ...state, status: action.message };
    case RESET_ERROR:
      return { ...state, status: '' };
    default:
      return state;
  }
};

export default reducer;
