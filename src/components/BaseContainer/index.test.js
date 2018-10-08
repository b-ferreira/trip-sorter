
import React from 'react';
import { shallow } from 'enzyme';

import BaseContainer from './index';

describe('<BaseContainer />', () =>{
  it('renders a .base-container div', () => {
    const wrapper = shallow(<BaseContainer />);
    expect(wrapper.find('.base-container')).toHaveLength(1);
  });

  it('renders a children with no errors', () => {
    const wrapper = shallow(
      <BaseContainer>
        <span className="foo">Foo</span>
      </BaseContainer>);
    expect(wrapper.find('.foo')).toHaveLength(1);
  });
});
