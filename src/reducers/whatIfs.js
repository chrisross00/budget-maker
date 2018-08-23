const defaultValue = [];

export default (state = defaultValue, action) => {
  switch (action.type) {
    case 'STORE_WHATIF':
      return [
        ...state,
        action.whatIfs
      ];
    case 'RESET_WHATIFS':
      return defaultValue;
    default:
      return state
  }
}
