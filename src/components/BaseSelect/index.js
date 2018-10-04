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
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedValue: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    onChange: identity,
    selectedValue: null,
  };

  handleChange = event => {
    const value = event.target.value;
    this.props.onChange(value);
  };

  render() {
    const { className, label, options, selectedValue } = this.props;
    return (
      <div className={classNames(block.toString(), className)}>
        <label className={block.element('label')}>
          {label}
          <select
            className={block.element('select').modifier(selectedValue === '' && 'empty')}
            value={selectedValue}
            onChange={this.handleChange}
          >
            <option
              className={block.element('option').modifier('empty')}
              value=""
            >
              Select an opton
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
