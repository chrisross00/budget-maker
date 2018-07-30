import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseDashboardPage } from '../../components/DashboardPage';

test('should render DashboardPage component properly', () => {
  const wrapper = shallow(<ExpenseDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
