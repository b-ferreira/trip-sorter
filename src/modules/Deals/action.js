
import { DEALS_ACTIONS } from './constants';
import { loadDeals } from './service';

/**
 * Deals request action.
 */
const dealsRequest = () => ({
  type: DEALS_ACTIONS.REQUEST
});

/**
 * Deals success action.
 *
 * @param {Object} data API Server response containing the deals list.
 */
const dealsSuccess = ({ deals }) => ({
  type: DEALS_ACTIONS.SUCCESS,
  payload: {
    deals
  }
});

/**
 * Deals error action.
 *
 * @param {*} error API Server request error.
 */
const dealsError = error => ({
  type: DEALS_ACTIONS.ERROR,
  error
});

/**
 * Action creator that performs an API request in order to load and set
 * the deals list into the store.
 */
export const getDeals = () => dispatch => {
  dispatch(dealsRequest());

  loadDeals()
    .then(response => dispatch(dealsSuccess(response)))
    .catch(error => dispatch(dealsError(error)));
};
