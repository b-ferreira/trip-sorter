import { concat, map, prop, uniq } from 'ramda';
import { createSelector } from 'reselect';

const dealsBaseState = state => state.deals;

export const dealsListSelector = createSelector(
  dealsBaseState,
  ({ data }) => data || []
);

const allDepartureCities = map(prop('departure'));
const allArrivalCities = map(prop('arrival'));
export const availableCitiesSelector = createSelector(
  dealsBaseState,
  ({ data }) => data ? uniq(concat(allDepartureCities(data), allArrivalCities(data))).sort() : []
);
