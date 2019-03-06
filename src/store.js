import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createHistory from 'history/createHashHistory';
import rootReducer from './reducers';

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

export default createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composedEnhancers,
);
