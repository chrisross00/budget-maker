import React from 'react';
import { shallow } from 'enzyme';
import AddIncomePage from '../../components/AddIncomePage';

test('should render AddIncomePage', () => {
  const wrapper = shallow(<AddIncomePage />);
  expect(wrapper).toMatchSnapshot();
});
