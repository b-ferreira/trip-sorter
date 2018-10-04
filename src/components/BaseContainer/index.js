import './index.scss';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';
import React from 'react';

import { bem } from 'utils/style';

const block = bem('base-container');

const BaseContainer = ({ className, children }) => (
  <div className={classNames(block.toString(), className)}>
    {!isNil(children) && children}
  </div>
);

BaseContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

BaseContainer.defaultProps = {
  className: null,
  children: null
};

export default BaseContainer;
