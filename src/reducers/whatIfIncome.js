const defaultValue = []

export default (state = defaultValue, action) => {
  switch (action.type) {
    case 'ADD_WHATIF_INCOME':
      return [
        ...state,
        action.whatIfIncome
      ];
    case 'UPDATE_WHATIF_INCOME':
      return state.map((whatIfIncome) => {
        if (whatIfIncome.description === action.updates.description) {
          return {
            ...whatIfIncome,
            ...action.updates
          }
        } else {
          return whatIfIncome;
        }
      })
    case 'RESET_WHATIF_INCOME':
      return [
        ...action.updates
      ]
    default:
      return state
  }
}
