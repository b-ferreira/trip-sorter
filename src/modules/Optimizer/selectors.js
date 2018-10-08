import { getDataSelector, isLoadingSelector, hasLoadedSelector, hasErrorSelector } from 'utils/state';

const optimizerBaseState = state => state.optimizer;

export const optimizedTripSelector = getDataSelector(optimizerBaseState);
export const isOptimizedTripLoadingSelector = isLoadingSelector(optimizerBaseState);
export const hasOptimizedTripLoadedSelector = hasLoadedSelector(optimizerBaseState);
export const hasOptimizedTripErrorSelector = hasErrorSelector(optimizerBaseState);
