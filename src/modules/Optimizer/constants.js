/**
 * Available actions for Trip Sorter state management.
 */
export const OPTIMIZER_ACTIONS = {
  REQUEST: 'optimizimer-request',
  SUCCESS: 'optimizimer-success',
  ERROR: 'optimizimer-error',
  RESET: 'optimizimer-reset'
};

/**
 * Available sorting options.
 */
export const AVAILABLE_SORTING_OPTIONS = {
  cheapest: 'cheapest',
  fastest: 'fastest'
};

/**
 * Configure the available sort strategies, e.g. the cheapest sort and the
 * fastest sort.
 */
export const AVAILABLE_SORTING_STRATEGIES = {
  cheapest: {
    calc: ({ cost, discount }) => cost - ((cost * discount) / 100),
    sorter: (a, b) => {
      if (!a || !b) return 0;
      const aPrice = a.cost - ((a.cost * a.discount) / 100);
      const bPrice = b.cost - ((b.cost * b.discount) / 100);
      return aPrice - bPrice;
    }
  },
  fastest: {
    calc: ({ duration: { h, m }}) => parseInt(h + m),
    sorter: (a, b) => {
      if (!a || !b) return 0;
      const aTime = (({ h, m }) => parseInt(h + m))(a.duration);
      const bTime = (({ h, m }) => parseInt(h + m))(b.duration);
      return aTime - bTime;
    }
  }
};
