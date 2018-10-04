import './index.scss';

import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import { bem } from 'utils/style';

const block = bem('app-root');

class AppRoot extends PureComponent {
  render() {
    return (
      <div className={block}>
        {this.props.children}
      </div>
    );
  }
}

AppRoot.propTypes = {
  children: PropTypes.any.isRequired
};

export default AppRoot;
