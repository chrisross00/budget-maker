import uuid from 'uuid';

const incomeTypeReducerDefaultState = [
  {
    id: 1,
    type: 'Primary',
    label: 'Primary'
  },
  {
    id: 2,
    type: 'Secondary',
    label: 'Secondary'
  }
];

export default (state = incomeTypeReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_INCOME_TYPE':
      return {
        ...state,
        action
      };
    default:
      return state;
  }
}
