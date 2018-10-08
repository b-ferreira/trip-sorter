import dealsExample from 'fixtures/dealsResponseExample.json';
import optimalPathExample from 'fixtures/optimizedPathExample.json';

import { findOptimimalPath } from '../utils';

const AVAILABLE_CITIES = {
  from: 'Amsterdam',
  to: 'Kiev'
};

describe('Optimizer pathfinder utils', () => {
  it('returns an empty array if wrong parameters has been provided', () => {
    findOptimimalPath().then(path => expect(path).toEqual([]));
    findOptimimalPath({}, 'foo', 'bar').then(path =>
      expect(path).toEqual([])
    );
    findOptimimalPath(null, null, null).then(path =>
      expect(path).toEqual([])
    );
  });

  it('returns an empty array if a not available city is provided', () => {
    findOptimimalPath(dealsExample, 'Campinas', 'São Paulo').
      then(data => expect(data).toEqual([]));
  });

  it('returns an optimal path', () => {
    findOptimimalPath(dealsExample, AVAILABLE_CITIES.from, AVAILABLE_CITIES.to)
      .then(path => expect(path).toEqual(optimalPathExample));
  });
});
