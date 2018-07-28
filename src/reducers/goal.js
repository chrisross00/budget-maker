const goalDefaultValue = [];

export default (state = goalDefaultValue, action) => {
  switch (action.type) {
    case 'ADD_GOAL':
      console.log('REDUCER: action.goal ', action.goal);
      return [
        ...state,
        action.goal
      ];
    default:
      return state
  }
}
