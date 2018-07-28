const expenseTypeDefaultState = [
  {
    id: 1,
    type: 'Fixed',
    label: 'Fixed'
  }, {
    id: 2,
    type: 'Variable',
    label: 'Variable'
  }];

export default (state = expenseTypeDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
