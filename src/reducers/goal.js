const goalDefaultValue = [];

export default (state = goalDefaultValue, action) => {
  switch (action.type) {
    case 'ADD_GOAL':
      return [
        ...state,
        action.goal
      ];
    default:
      return state
  }
}
