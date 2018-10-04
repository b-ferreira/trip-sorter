import { OPTIMIZER_ACTIONS } from './constants';
import { requestInitialState, requestLoadingState, requestSuccessState, requestErrorState } from 'utils/state';

const defaultState = requestInitialState([]);

export default (state = defaultState, action) => {
  switch (action.type) {
    case OPTIMIZER_ACTIONS.REQUEST: {
      return requestLoadingState(state);
    }
    case OPTIMIZER_ACTIONS.SUCCESS: {
      return requestSuccessState(state, action.payload.paths);
    }
    case OPTIMIZER_ACTIONS.ERROR: {
      return requestErrorState(state, action.error);
    }
    case OPTIMIZER_ACTIONS.RESET: {
      return defaultState;
    }
    default: {
      return state;
    }
  }
};
