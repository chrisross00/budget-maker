const defaultGoalType = [
  {
    value: '3 month emergency fund',
    label: '3 month emergency fund'
  }, {
    value: '6 month emergency fund',
    label: '6 month emergency fund'
  },
  {
    value: 'Custom savings goal',
    label: 'Custom savings goal'
  }
];

export default (state = defaultGoalType, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
