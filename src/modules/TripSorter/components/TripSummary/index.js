import './index.scss';

import PropTypes from 'prop-types';
import numeral from 'numeral';
import React from 'react';
import { bem } from 'utils/style';

const block = bem('trip-summary');
const formatCost = cost => numeral(cost).format('0,0.00$');

const TripSummary = ({ cost, duration }) => (
  <div className={block}>
    <span className={block.element('label')}>Total</span>
    <span className={block.element('label')}>{duration.h}h{duration.m}</span>
    <span className={block.element('label')}>{formatCost(cost)}</span>
  </div>
);

TripSummary.propTypes = {
  cost: PropTypes.number.isRequired,
  duration: PropTypes.object.isRequired,
};

export default TripSummary;
