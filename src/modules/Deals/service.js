import DealsResponse from 'mocks/deals-response.json';

/**
 * A function which mimics the API server request to load the deals.
 * It will return the content of "__mocks__/deals-response.json" as response
 * into a promise.
 */
export const loadDeals = () => new Promise(resolve => {
  setTimeout(() => {
    resolve(DealsResponse);
  }, 1000);
});
