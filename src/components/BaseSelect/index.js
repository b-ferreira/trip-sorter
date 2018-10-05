import './index.scss';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { isEmpty, identity } from 'ramda';
import React, { PureComponent } from 'react';

import { bem } from 'utils/style';

const block = bem('base-select');

class BaseSelect extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedValue: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    isDisabled: false,
    onChange: identity,
    selectedValue: null,
  };

  handleChange = event => {
    const value = event.target.value;
    this.props.onChange(value);
  };

  render() {
    const { className, isDisabled, label, options, selectedValue } = this.props;
    return (
      <div className={classNames(block.toString(), className)}>
        <label className={block.element('label')}>
          {label}
          <select
            className={block.element('select').modifier(selectedValue === '' && 'empty')}
            value={selectedValue}
            disabled={ isDisabled ? 'disabled' : null }
            onChange={this.handleChange}
          >
            <option
              className={block.element('option').modifier('empty')}
              value=""
            >
              Select an option
            </option>
            {!isEmpty(options) &&
              options.map(({ value, label }) => (
                <option
                  className={block.element('option')}
                  key={value}
                  value={value}
                >
                  {label}
                </option>
              ))}
          </select>
        </label>
      </div>
    );
  }
}

export default BaseSelect;
