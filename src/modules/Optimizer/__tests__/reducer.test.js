import reducer from 'reducers';

import optimizedPathExample from 'fixtures/optimizedPathExample.json';

import { OPTIMIZER_ACTIONS } from '../constants';
import {
  optimizedTripSelector,
  isOptimizedTripLoadingSelector,
  hasOptimizedTripLoadedSelector,
  hasOptimizedTripErrorSelector
} from '../selectors';

describe('Optimizer state', () => {
  const defaultState = reducer(undefined, {});

  describe('Default state', () => {
    it('has no data', () => {
      expect(optimizedTripSelector(defaultState)).toEqual([]);
    });

    it('is not loading', () => {
      expect(isOptimizedTripLoadingSelector(defaultState)).toBeFalsy();
    });

    it('is not loaded', () => {
      expect(hasOptimizedTripLoadedSelector(defaultState)).toBeFalsy();
    });

    it('has no error', () => {
      expect(hasOptimizedTripErrorSelector(defaultState)).toBeFalsy();
    });
  });

  describe(OPTIMIZER_ACTIONS.REQUEST, () => {
    const state = [{ type: OPTIMIZER_ACTIONS.REQUEST }].reduce(
      reducer,
      defaultState
    );

    it('has no data', () => {
      expect(optimizedTripSelector(state)).toEqual([]);
    });

    it('is loading', () => {
      expect(isOptimizedTripLoadingSelector(state)).toBeTruthy();
    });

    it('is not loaded', () => {
      expect(hasOptimizedTripLoadedSelector(state)).toBeFalsy();
    });

    it('has no error', () => {
      expect(hasOptimizedTripErrorSelector(state)).toBeFalsy();
    });

    it('keeps loaded data', () => {
      const paths = optimizedPathExample;
      const loadedDataAndLoadingState = [
        { type: OPTIMIZER_ACTIONS.REQUESTED },
        {
          type: OPTIMIZER_ACTIONS.SUCCESS,
          payload: { paths }
        },
        { type: OPTIMIZER_ACTIONS.REQUESTED }
      ].reduce(reducer, defaultState);

      expect(optimizedTripSelector(loadedDataAndLoadingState)).toEqual(
        paths
      );
    });
  });

  describe(OPTIMIZER_ACTIONS.SUCCESS, () => {
    const paths = optimizedPathExample;
    const state = [
      { type: OPTIMIZER_ACTIONS.REQUESTED },
      {
        type: OPTIMIZER_ACTIONS.SUCCESS,
        payload: { paths }
      }
    ].reduce(reducer, defaultState);

    it('has data', () => {
      expect(optimizedTripSelector(state)).toEqual(paths);
    });

    it('is not loading', () => {
      expect(isOptimizedTripLoadingSelector(state)).toBeFalsy();
    });

    it('is loaded', () => {
      expect(hasOptimizedTripLoadedSelector(state)).toBeTruthy();
    });

    it('has no error', () => {
      expect(hasOptimizedTripErrorSelector(state)).toBeFalsy();
    });
  });

  describe(OPTIMIZER_ACTIONS.ERROR, () => {
    const error = 'error';

    const state = [
      { type: OPTIMIZER_ACTIONS.REQUESTED },
      { type: OPTIMIZER_ACTIONS.ERROR, error }
    ].reduce(reducer, defaultState);

    it('has no data', () => {
      expect(optimizedTripSelector(state)).toEqual([]);
    });

    it('is not loading', () => {
      expect(isOptimizedTripLoadingSelector(state)).toBeFalsy();
    });

    it('is not loaded', () => {
      expect(hasOptimizedTripLoadedSelector(state)).toBeFalsy();
    });

    it('has error', () => {
      expect(hasOptimizedTripErrorSelector(state)).toBeTruthy();
    });
  });
});
