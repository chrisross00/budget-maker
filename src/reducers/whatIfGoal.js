const defaultValue = [];

export default (state = defaultValue, action) => {
  switch (action.type) {
    case 'ADD_WHATIF_GOAL':
      return [
        ...state,
        action.whatIfGoal
      ];
    case 'RESET_WHATIF_GOAL':
      return [
        ...action.updates
      ]
    default:
      return state
  }
}
