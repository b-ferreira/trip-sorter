import './index.scss';
import RightArrow from 'images/arrow-right.svg';

import numeral from 'numeral';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { bem } from 'utils/style';

const block = bem('trip-list-item');

class TripListItem extends PureComponent {
  static propTypes = {
    arrival: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    departure: PropTypes.string.isRequired,
    discount: PropTypes.number.isRequired,
    duration: PropTypes.object.isRequired,
    reference: PropTypes.string.isRequired,
    transport: PropTypes.string.isRequired,
  }

  get finalCost() {
    const { cost, discount } = this.props;
    return numeral(cost - ((cost * discount) / 100)).format('0,0.00$');
  }

  get originaCost() {
    return numeral(this.props.cost).format('0,0.00$');
  }

  render() {
    const { arrival, departure, discount, duration, reference, transport } = this.props;
    return (
      <div className={block}>
        <div className={block.element('column').modifier('trip')}>
          <div className={block.element('row').modifier('cities')}>
            <span className={block.element('label')}>{departure}</span>
            <RightArrow className={block.element('arrow').toString()} />
            <span className={block.element('label')}>{arrival}</span>
          </div>
          <div className={block.element('row').modifier('details')}>
            <span className={block.element('label').modifier('transport')}>{transport}</span>
            <span className={block.element('label').modifier('reference')}>{reference}</span>
            <span className={block.element('label')}>for {duration.h}h{duration.m}</span>
          </div>
        </div>
        <div className={block.element('column').modifier('cost')}>
          <div className={block.element('row').modifier('final-cost').modifier(discount && 'with-discount')}>
            <span className={block.element('label')}>{this.finalCost}</span>
          </div>
          {discount > 0 && (
            <div className={block.element('row').modifier('discount-info')}>
              <span className={block.element('label').modifier('original-cost')}>{this.originaCost}</span>
              <span className={block.element('label').modifier('discount')}>{discount}% off</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TripListItem;
