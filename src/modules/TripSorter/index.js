import './index.scss';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { bem } from 'utils/style';
import {
  dealsListSelector,
  getDeals,
  availableCitiesSelector
} from 'modules/Deals';
import {
  optimizedTripSelector,
  optimizeTrip,
  AVAILABLE_SORTING_STRATEGIES,
} from 'modules/Optimizer';

import { VIEWS } from './constants';
import TripForm from 'modules/TripSorter/components/TripForm';
import TripList from 'modules/TripSorter/components/TripList';

const block = bem('trip-sorter');

class TripSorter extends PureComponent {
  static propTypes = {
    availableCities: PropTypes.arrayOf(PropTypes.string).isRequired,
    deals: PropTypes.array.isRequired,
    getDeals: PropTypes.func.isRequired,
    optimizeTrip: PropTypes.func.isRequired,
    optimalTripPath: PropTypes.array.isRequired
  }

  state = {
    currentView: VIEWS.FORM
  }

  componentDidMount() {
    this.props.getDeals();
  }

  handleFormSubmit = ({ from, to, sortType }) => {
    const { deals } = this.props;
    this.props
      .optimizeTrip(deals, from, to, AVAILABLE_SORTING_STRATEGIES[sortType])
      .then(this.setState({
        currentView: VIEWS.LIST
      }));
  }

  handleReset = () => {
    this.setState({
      currentView: VIEWS.FORM
    });
  }

  render() {
    const { availableCities, optimalTripPath } = this.props;
    const { currentView } = this.state;
    return <div className={block}>
      {currentView === VIEWS.FORM ? (
        <TripForm cities={availableCities} onFormSubmit={this.handleFormSubmit} />
      ) : (
        <TripList list={optimalTripPath} onReset={this.handleReset} />
      )}
    </div>;
  }
}

const mapStateToProps = state => ({
  availableCities: availableCitiesSelector(state),
  deals: dealsListSelector(state),
  optimalTripPath: optimizedTripSelector(state)
});

export default connect(
  mapStateToProps, { getDeals, optimizeTrip, }
)(TripSorter);
