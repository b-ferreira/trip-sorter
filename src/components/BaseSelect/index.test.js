import React from 'react';
import { shallow } from 'enzyme';

import BaseSelect from './index';

const options = [{ value: 'foo', label: 'bar' }];

describe('<BaseSelect />', () => {
  it('renders a .base-select div', () => {
    const wrapper = shallow(<BaseSelect label="bar" selectedValue="" options={options} />);
    expect(wrapper.find('.base-select')).toHaveLength(1);
  });

  it('renders a label', () => {
    const wrapper = shallow(<BaseSelect label="bar" selectedValue="" options={options} />);
    expect(wrapper.find('.base-select__label')).toHaveLength(1);
  });

  it('has onChange callback', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(<BaseSelect label="bar" selectedValue="" options={options} onChange={handleChange} />);
    const select = wrapper.find('.base-select__select');
    select.simulate('change', { target: { value: 'foo' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
