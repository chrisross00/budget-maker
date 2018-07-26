const defaultIncome = [];


export default (state = defaultIncome, action) => {
  switch (action.type) {
    case 'ADD_INCOME':
      return [
        ...state,
        action.income
      ];
    case 'REMOVE_INCOME':
      return (state.filter(({ id }) => id != action.id));
    default:
      return state;
  }
}
