import { createSelector } from 'reselect';

const dealsBaseState = state => state.deals;

export const dealsListSelector = createSelector(
  dealsBaseState,
  ({ data }) => data || []
);
