const defaultValue = [];

export default (state = defaultValue, action) => {
  switch (action.type) {
    case 'ADD_WHATIF_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'UPDATE_WHATIF_EXPENSE':
      return state.map((expense) => {
        if (expense.expenseCategoryId === action.updates.expenseCategoryId) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense;
        }
      });
    case 'RESET_WHATIF_EXPENSE':
      return [
        ...action.updates
      ]
    default:
      return state
  }
}
