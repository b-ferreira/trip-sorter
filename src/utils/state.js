/**
 * Helper function which returns default intial state for reducers.
 *
 * @param {*} initialData Any required initial data for reducer state
 */
export const requestInitialState = (initialData = {}) => ({
  data: initialData,
  isLoading: false,
  isLoaded: false,
  error: null
});

/**
 * Helper function which set the loading state on reducers.
 *
 * @param {Object} state Current reducer state.
 */
export const requestLoadingState = state => ({
  ...state,
  isLoading: true,
  isLoaded: false,
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
  isLoading: false,
  isLoaded: true,
  data,
  error: null,
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
  isLoading: false,
  isLoaded: false,
  error
});
