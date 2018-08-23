const defaultIncome = [];


export default (state = defaultIncome, action) => {
  switch (action.type) {
    case 'ADD_INCOME':
      return [
        ...state,
        action.income
      ];
    case 'UPDATE_INCOME':
      return state.map((income) => {
        if (income.id === action.id) {
          return {
            ...income,
            ...action.updates
          }
        } else {
          return income;
        }
      })
    case 'REMOVE_INCOME':
      return (state.filter(({ id }) => id != action.id));
    default:
      return state;
  }
}
