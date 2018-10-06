import './index.scss';

import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import React, { PureComponent } from 'react';

import { bem } from 'utils/style';

import TripListItem from '../TripListItem';
import { sumTime } from 'utils/time';
import TripSummary from 'modules/TripSorter/components/TripSummary';

const block = bem('trip-list');

class TripList extends PureComponent {
  static propTypes = {
    list: PropTypes.array.isRequired,
    onReset: PropTypes.func.isRequired,
  }

  get summary() {
    const { list } = this.props;
    if (!isEmpty(list)) {
      return list.reduce((result, { cost, discount, duration }) => {
        result.cost = (result.cost || 0) + (cost - (cost * discount) / 100);
        result.duration = sumTime(result.duration, duration);
        return result;
      }, {});
    }

    return { cost: 0, duration: { h: 0, m: 0 } };
  }

  render() {
    const { list, onReset } = this.props;
    const { cost, duration } = this.summary;
    return (
      <div className={block}>
        {!isEmpty(list) && list.map(
          trip => <TripListItem key={trip.reference} {...trip} />
        )}

        <TripSummary cost={cost} duration={duration} />

        <button className={block.element('reset-btn')} onClick={onReset}>
          Reset
        </button>
      </div>
    );
  }
}

export default TripList;
