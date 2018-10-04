import { requestInitialState, requestLoadingState, requestSuccessState, requestErrorState } from 'utils/state';

import { DEALS_ACTIONS } from './constants';

const defaultState = requestInitialState([]);

export default (state = defaultState, action) => {
  switch (action.type) {
    case DEALS_ACTIONS.REQUEST: {
      return requestLoadingState(state);
    }
    case DEALS_ACTIONS.SUCCESS: {
      return requestSuccessState(state, action.payload.deals);
    }
    case DEALS_ACTIONS.ERROR: {
      return requestErrorState(state, action.error);
    }
    default: {
      return state;
    }
  }
};
