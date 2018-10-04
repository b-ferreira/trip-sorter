import 'style/base';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import AppRoot from 'modules/App';

import Store from './store';

const appNode = document.querySelector('#app');

render(
  <Provider store={Store}>
    <AppRoot />
  </Provider>,
  appNode
);
