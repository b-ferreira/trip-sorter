import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import Middlewares from 'middlewares';
import rootReducer from 'reducers';

const composeEnhancers = composeWithDevTools({
  maxAge: 100
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...Middlewares))
);

export default store;
