import './index.scss';

import React, { PureComponent } from 'react';

import { bem } from 'utils/style';
import TripSorter from 'modules/TripSorter';

const block = bem('app-root');

class AppRoot extends PureComponent {
  render() {
    return (
      <div className={block}>
        <h1 className={block.element('title')}>TripSorter</h1>
        <TripSorter />
      </div>
    );
  }
}

export default AppRoot;
