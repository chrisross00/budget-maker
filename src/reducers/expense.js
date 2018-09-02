const defaultExpense = [];

export default (state = defaultExpense, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      console.log('add-expense-reducer');
      return [
        ...state,
        action.expense
      ];
    case 'UPDATE_EXPENSE':
      return state.map((expense) => {
        console.log('update expense reducer');
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense;
        }
      })
    case 'SET_EXPENSES':
      return action.expenses;
    default:
      return state;
  }
};
