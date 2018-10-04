import { combineReducers } from 'redux';

import { dealsReducer } from 'modules/Deals';
import { optimizerReducer } from 'modules/Optimizer';

export default combineReducers({
  deals: dealsReducer,
  optimizer: optimizerReducer,
});
