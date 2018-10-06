import 'style/base';

import numeral from 'numeral';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import AppRoot from 'modules/App';

import Store from './store';

const appNode = document.querySelector('#app');
numeral.register('locale', 'eng', {
  delimiters: {
    thousands: ',',
    decimal: '.'
  },
  currency: {
    symbol: '€'
  }
});
numeral.locale('eng');

render(
  <Provider store={Store}>
    <AppRoot />
  </Provider>,
  appNode
);
