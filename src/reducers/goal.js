const goalDefaultValue = [
];

export default (state = goalDefaultValue, action) => {
  switch (action.type) {
    case 'ADD_GOAL':
      return [
        ...state,
        action.goal
      ];
    case 'SET_GOALS':
      return action.goals
    default:
      return state
  }
}
