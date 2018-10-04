import { combineReducers } from 'redux';

import { dealsReducer } from 'modules/Deals';

export default combineReducers({
  deals: dealsReducer
});
