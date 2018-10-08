import reducer from 'reducers';

import citiesExample from 'fixtures/citiesExample.json';
import dealsResponseExample from 'fixtures/dealsResponseExample.json';

import { DEALS_ACTIONS } from '../constants';
import {
  dealsListSelector,
  isDealsListLoadingSelector,
  hasDealsListLoadedSelector,
  hasDealsListErrorSelector,
  availableCitiesSelector
} from '../selectors';

describe('Deals state', () => {
  const defaultState = reducer(undefined, {});

  describe('Default state', () => {
    it('has no data', () => {
      expect(dealsListSelector(defaultState)).toEqual([]);
    });

    it('is not loading', () => {
      expect(isDealsListLoadingSelector(defaultState)).toBeFalsy();
    });

    it('is not loaded', () => {
      expect(hasDealsListLoadedSelector(defaultState)).toBeFalsy();
    });

    it('has no error', () => {
      expect(hasDealsListErrorSelector(defaultState)).toBeFalsy();
    });
  });

  describe(DEALS_ACTIONS.REQUEST, () => {
    const state = [{ type: DEALS_ACTIONS.REQUEST }].reduce(
      reducer,
      defaultState
    );

    it('has no data', () => {
      expect(dealsListSelector(state)).toEqual([]);
    });

    it('is loading', () => {
      expect(isDealsListLoadingSelector(state)).toBeTruthy();
    });

    it('is not loaded', () => {
      expect(hasDealsListLoadedSelector(state)).toBeFalsy();
    });

    it('has no error', () => {
      expect(hasDealsListErrorSelector(state)).toBeFalsy();
    });

    it('keeps loaded data', () => {
      const deals = dealsResponseExample;
      const loadedDataAndLoadingState = [
        { type: DEALS_ACTIONS.REQUEST },
        {
          type: DEALS_ACTIONS.SUCCESS,
          payload: { deals }
        },
        { type: DEALS_ACTIONS.REQUEST }
      ].reduce(reducer, defaultState);

      expect(dealsListSelector(loadedDataAndLoadingState)).toEqual(deals);
    });
  });

  describe(DEALS_ACTIONS.SUCCESS, () => {
    const deals = dealsResponseExample;
    const state = [
      { type: DEALS_ACTIONS.REQUEST },
      {
        type: DEALS_ACTIONS.SUCCESS,
        payload: { deals }
      }
    ].reduce(reducer, defaultState);

    it('has data', () => {
      expect(dealsListSelector(state)).toEqual(deals);
    });

    it('is not loading', () => {
      expect(isDealsListLoadingSelector(state)).toBeFalsy();
    });

    it('is loaded', () => {
      expect(hasDealsListLoadedSelector(state)).toBeTruthy();
    });

    it('has no error', () => {
      expect(hasDealsListErrorSelector(state)).toBeFalsy();
    });

    it('has cities available', () => {
      expect(availableCitiesSelector(state)).toEqual(citiesExample);
    });
  });

  describe(DEALS_ACTIONS.ERROR, () => {
    const error = 'error';

    const state = [
      { type: DEALS_ACTIONS.REQUEST },
      { type: DEALS_ACTIONS.ERROR, error }
    ].reduce(reducer, defaultState);

    it('has no data', () => {
      expect(dealsListSelector(state)).toEqual([]);
    });

    it('is not loading', () => {
      expect(isDealsListLoadingSelector(state)).toBeFalsy();
    });

    it('is not loaded', () => {
      expect(hasDealsListLoadedSelector(state)).toBeFalsy();
    });

    it('has error', () => {
      expect(hasDealsListErrorSelector(state)).toBeTruthy();
    });
  });
});
