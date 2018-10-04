import { createSelector } from 'reselect';

const optimizerBaseState = state => state.optimizer;

export const optimizedTripSelector = createSelector(
  optimizerBaseState,
  ({ data }) => data || []
);
