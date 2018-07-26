import React from 'react';
import { shallow } from 'enzyme';
import IncomeForm from '../../components/IncomeForm';



// beforeEach(() => {
//   wrapper = shallow(
//     <IncomeForm
//       list={list} />
//   )
// })

test('should render IncomeForm', () => {
  const lists = [{
    id: 1,
    type: 'primary'
  },
  {
    id: 2,
    type: 'secondary'
  }];
  const wrapper = shallow(<IncomeForm list={[]} />);
  expect(wrapper).toMatchSnapshot();
})
