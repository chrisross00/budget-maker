const defaultExpense = [];

export default (state = defaultExpense, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'UPDATE_EXPENSE':
      return state.map((expense) => {
        if (expense.expenseCategoryId === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense;
        }
      })
    default:
      return state;
  }
};
