const frequencyTypeDefaultState = [
  {
    id: 1,
    type: 'Daily',
  }, {
    id: 2,
    type: 'Weekly',
  }, {
    id: 3,
    type: 'Bi-weekly'
  }, {
    id: 4,
    type: 'Semi-monthly'
  }, {
    id: 5,
    type: 'Monthly',
  }, {
    id: 6,
    type: 'Quarterly',
  }, {
    id: 7,
    type: 'Semi-Annually'
  }, {
    id: 8,
    type: 'Annual'
  }]

export default (state = frequencyTypeDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
