import { concat, map, prop, uniq } from 'ramda';
import { createSelector } from 'reselect';
import { getDataSelector, isLoadingSelector, hasLoadedSelector, hasErrorSelector } from 'utils/state';

const dealsBaseState = state => state.deals;

export const dealsListSelector = getDataSelector(dealsBaseState);
export const isDealsListLoadingSelector = isLoadingSelector(dealsBaseState);
export const hasDealsListLoadedSelector = hasLoadedSelector(dealsBaseState);
export const hasDealsListErrorSelector = hasErrorSelector(dealsBaseState);

const allDepartureCities = map(prop('departure'));
const allArrivalCities = map(prop('arrival'));
export const availableCitiesSelector = createSelector(
  dealsBaseState,
  ({ data }) => data ? uniq(concat(allDepartureCities(data), allArrivalCities(data))).sort() : []
);
