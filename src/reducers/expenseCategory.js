const expenseCategoryDefaultState = [
  {
    value: 'Rent',
    label: 'Rent',
    expenseCategory: 'Rent',
    expenseCategoryId: 1,
    expenseTypeId: 1
  }, {
    value: 'Food',
    label: 'Food',
    expenseCategory: 'Food',
    expenseCategoryId: 2,
    expenseTypeId: 1
  }, {
    value: 'Utilities',
    label: 'Utilities',
    expenseCategory: 'Utilities',
    expenseCategoryId: 3,
    expenseTypeId: 1
  }, {
    value: 'Cell Phone',
    label: 'Cell Phone',
    expenseCategory: 'Cell Phone',
    expenseCategoryId: 4,
    expenseTypeId: 1
  }, {
    value: 'Gym',
    label: 'Gym',
    expenseCategory: 'Gym',
    expenseCategoryId: 5,
    expenseTypeId: 1
  }, {
    value: 'TV',
    label: 'TV',
    expenseCategory: 'TV',
    expenseCategoryId: 6,
    expenseTypeId: 1
  }, {
    value: 'Internet',
    label: 'Internet',
    expenseCategory: 'Internet',
    expenseCategoryId: 7,
    expenseTypeId: 1
  }, {
    value: 'Transport',
    label: 'Transport',
    expenseCategory: 'Transport',
    expenseCategoryId: 8,
    expenseTypeId: 1
  },
];

export default (state = expenseCategoryDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
