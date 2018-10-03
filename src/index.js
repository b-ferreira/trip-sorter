import React from 'react';
import { render } from 'react-dom';

const AppRoot = () => <div>Property Finder!</div>;
const appNode = document.querySelector('#app');

render(
  <AppRoot />,
  appNode
);
