/**
 * Meta sufixes mapping.
 * Every state must have these attributes.
 */
const STATE_META_SUFFIXES = {
  DATA: 'data',
  IS_LOADING: 'isLoading',
  LOADED: 'loaded',
  ERROR: 'error'
};

/**
 * Helper function which returns default intial state for reducers.
 *
 * @param {*} initialData Any required initial data for reducer state
 */
export const requestInitialState = (initialData = {}) => ({
  [STATE_META_SUFFIXES.DATA]: initialData,
  [STATE_META_SUFFIXES.IS_LOADING]: false,
  [STATE_META_SUFFIXES.LOADED]: false,
  [STATE_META_SUFFIXES.ERROR]: null
});

/**
 * Helper function which set the loading state on reducers.
 *
 * @param {Object} state Current reducer state.
 */
export const requestLoadingState = state => ({
  ...state,
  [STATE_META_SUFFIXES.IS_LOADING]: true,
  [STATE_META_SUFFIXES.LOADED]: false,
});

/**
 * Helper function that set given data on reducer state.
 * It also set 'isLoading' and 'isLoaded' attributes.
 *
 * @param {Object} state Current reducer state
 * @param {*} data Any data to be set on state
 */
export const requestSuccessState = (state, data) => ({
  ...state,
  [STATE_META_SUFFIXES.IS_LOADING]: false,
  [STATE_META_SUFFIXES.LOADED]: true,
  [STATE_META_SUFFIXES.DATA]: data,
  [STATE_META_SUFFIXES.ERROR]: null,
});

/**
 * Helper function that set given error on reduer state.
 * It also reset 'isLoading' and 'isLoaded' attributes.
 *
 * @param {Object} state Current reducer state
 * @param {*} error Any error ocurred during data fetch
 */
export const requestErrorState = (state, error) => ({
  ...state,
  [STATE_META_SUFFIXES.IS_LOADING]: false,
  [STATE_META_SUFFIXES.LOADED]: false,
  [STATE_META_SUFFIXES.ERROR]: error,
});

/**
 * Helper function to retrieve the data from state.
 *
 * @param {Function} inputSelector Selector function.
 */
export const getDataSelector = inputSelector => state =>
  inputSelector(state)[STATE_META_SUFFIXES.DATA];

/**
 * Helper function to determine if some piece of the state is loading.
 *
 * @param {Function} inputSelector Selector function.
 */
export const isLoadingSelector = inputSelector => state =>
  inputSelector(state)[STATE_META_SUFFIXES.IS_LOADING];

/**
 * Helper function to determine if some piece of the state has loaded.
 *
 * @param {Function} inputSelector Selector function.
 */
export const hasLoadedSelector = inputSelector => state =>
  inputSelector(state)[STATE_META_SUFFIXES.LOADED];

/**
 * Helper function to determine i some piece of the state has error.
 *
 * @param {Function} inputSelector Selector function.
 */
export const hasErrorSelector = inputSelector => state =>
  !!inputSelector(state)[STATE_META_SUFFIXES.ERROR];
