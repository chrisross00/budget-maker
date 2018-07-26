const frequencyTypeDefaultState = [
  {
    id: 1,
    type: 'Daily',
    label: 'Daily'
  }, {
    id: 2,
    type: 'Weekly',
    label: 'Weekly'
  }, {
    id: 3,
    type: 'Bi-weekly',
    label: 'Bi-weekly'
  }, {
    id: 4,
    type: 'Semi-monthly',
    label: 'Semi-monthly'
  }, {
    id: 5,
    type: 'Monthly',
    label: 'Monthly'
  }, {
    id: 6,
    type: 'Quarterly',
    label: 'Quarterly'
  }, {
    id: 7,
    type: 'Semi-Annually',
    label: 'Semi-Annually'
  }, {
    id: 8,
    type: 'Annual',
    label: 'Annual'
  }]

export default (state = frequencyTypeDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
