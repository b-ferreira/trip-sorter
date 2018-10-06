import './index.scss';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { filter, isEmpty } from 'ramda';
import React, { PureComponent } from 'react';

import { bem } from 'utils/style';
import { AVAILABLE_SORTING_OPTIONS } from 'modules/Optimizer';
import BaseRadioGroup from 'components/BaseRadioGroup';
import BaseSelect from 'components/BaseSelect';
import BaseContainer from 'components/BaseContainer';

const block = bem('trip-form');
const citiesMapping = city => ({ label: city, value: city });

class TripForm extends PureComponent {
  static propTypes = {
    cities: PropTypes.array,
    className: PropTypes.string,
    onFormSubmit: PropTypes.func.isRequired
  };

  static defaultProps = {
    cities: [],
    className: null
  };

  state = {
    from: '',
    to: '',
    sortType: AVAILABLE_SORTING_OPTIONS.cheapest
  };

  get isSubmitDisabled() {
    const { from, to } = this.state;
    return !isEmpty(from) && !isEmpty(to) ? null : 'disabled';
  }

  get sortOptions() {
    return Object.entries(AVAILABLE_SORTING_OPTIONS).map(([key, value]) => ({
      label: key,
      value
    }));
  }

  get mapCitiesFrom() {
    const { cities } = this.props;
    return cities.map(citiesMapping);
  }

  get mapCitiesTo() {
    const { from } = this.state;
    const { cities } = this.props;
    if (!isEmpty(from)) {
      return filter(city => city !== from, cities).map(citiesMapping);
    }

    return cities.map(citiesMapping);
  }

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.onFormSubmit(this.state);
  };

  handleFromSelectChange = value => {
    this.setState({
      from: value,
      to: '',
    });
  };

  handleToSelectChange = value => {
    this.setState({
      to: value
    });
  }

  handleSortTypeChange = value => {
    this.setState({
      sortType: value
    });
  };

  render() {
    const { className } = this.props;
    return (
      <form
        className={classNames(block.toString(), className)}
        onSubmit={this.handleFormSubmit}
      >
        <BaseContainer className={block.element('container').toString()}>
          <div className={block.element('sort-controls')}>
            <BaseSelect
              className={block.element('select').toString()}
              label="From"
              options={this.mapCitiesFrom}
              onChange={this.handleFromSelectChange}
              selectedValue={this.state.from}
            />

            <BaseSelect
              className={block.element('select').toString()}
              label="To"
              options={this.mapCitiesTo}
              onChange={this.handleToSelectChange}
              selectedValue={this.state.to}
              isDisabled={isEmpty(this.state.from)}
            />

            <BaseRadioGroup
              className={block.element('radio-group').toString()}
              horizontal
              name="sort-type"
              options={this.sortOptions}
              selectedValue={this.state.sortType}
              onChange={this.handleSortTypeChange}
            />
          </div>

          <div className={block.element('bottom')}>
            <input className={block.element('submit')} disabled={this.isSubmitDisabled} type="submit" value="Search" />
          </div>
        </BaseContainer>
      </form>
    );
  }
}

export default TripForm;
