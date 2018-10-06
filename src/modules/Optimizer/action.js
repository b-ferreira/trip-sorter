import { AVAILABLE_SORTING_OPTIONS, OPTIMIZER_ACTIONS } from './constants';
import { findOptimimalPath } from './utils';

/**
 * Optimization request action.
 */
const optimizationRequest = () => ({
  type: OPTIMIZER_ACTIONS.REQUEST
});

/**
 * Optimization success action.
 *
 * @param {Array} paths Optimmal path returned by Dijkastra algorithm.
 */
const optimizationSuccess = paths => ({
  type: OPTIMIZER_ACTIONS.SUCCESS,
  payload: {
    paths
  }
});

/**
 * Optimization error action.
 *
 * @param {*} error Any error occurred during Dijkastra algorithm.
 */
const optimizationError = error => ({
  type: OPTIMIZER_ACTIONS.ERROR,
  error
});

/**
 * Optimization reset action.
 */
const optimizationReset = () => ({
  type: OPTIMIZER_ACTIONS.REQUEST
});

/**
 * Action creator used to call optimization path function.
 *
 * @param {Array} dataset Array of deals used to compute the Graph.
 * @param {String} from Starting vertex reference.
 * @param {String} to Ending vertex reference.
 * @param {Function} sortStrategy Sorting strategy function.
 */
export const optimizeTrip = (dataset, from, to, sortStrategy = AVAILABLE_SORTING_OPTIONS.cheapst) => dispatch => {
  dispatch(optimizationRequest());

  return findOptimimalPath(dataset, from, to, sortStrategy)
    .then(paths => dispatch(optimizationSuccess(paths)))
    .catch(error => dispatch(optimizationError(error)));
};

/**
 * Action creator used to reset the optimization path array.
 */
export const resetOptimization = () => dispatch => {
  dispatch(optimizationReset());
};
