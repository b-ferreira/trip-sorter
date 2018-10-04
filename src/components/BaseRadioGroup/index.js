import './index.scss';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { isEmpty, identity } from 'ramda';
import React, { PureComponent } from 'react';

import { bem } from 'utils/style';

const block = bem('base-radio-group');

class BaseRadioGroup extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    horizontal: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedValue: PropTypes.string
  };

  static defaultProps = {
    className: null,
    horizontal: false,
    name: null,
    onChange: identity,
    selectedValue: null
  };

  handleChange = event => {
    const value = event.target.value;
    this.props.onChange(value);
  };

  render() {
    const { className, horizontal, name, options, selectedValue } = this.props;
    return (
      <div className={classNames(block.modifier(horizontal && 'horizontal').toString(), className)}>
        {!isEmpty(options) && options.map(({ label, value }) => (
          <label key={value} className={block.element('label')}>
            <input
              type="radio"
              name={name}
              value={value}
              className={block.element('radio')}
              checked={value === selectedValue}
              onChange={this.handleChange} />
            {label}
          </label>
        ))}
      </div>
    );
  }
}

export default BaseRadioGroup;
