import React from 'react';
import { shallow } from 'enzyme';

import BaseRadioGroup from './index';

const options = [{
  value: 'foo',
  label: 'bar'
}, {
  value: 'xpto',
  label: 'testing'
}];

describe('<BaseRadioGroup />', () => {
  it('renders a .base-radio-group div', () => {
    const wrapper = shallow(
      <BaseRadioGroup label="bar" selectedValue="" options={options} />
    );
    expect(wrapper.find('.base-radio-group')).toHaveLength(1);
  });

  it('renders options correctly', () => {
    const wrapper = shallow(
      <BaseRadioGroup label="bar" selectedValue="" options={options} />
    );
    expect(wrapper.find('.base-radio-group__radio')).toHaveLength(2);
  });

  it('has onChange callback', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(
      <BaseRadioGroup
        name="bar"
        selectedValue=""
        options={options}
        onChange={handleChange}
      />
    );
    const radio = wrapper.find('.base-radio-group__radio').at(0);
    radio.simulate('change', { target: { value: 'foo' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
