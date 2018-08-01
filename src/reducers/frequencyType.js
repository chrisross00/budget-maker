const frequencyTypeDefaultState = [
  {
    value: 'Daily',
    label: 'Daily',
    id: 1
  }, {
    value: 'Weekly',
    label: 'Weekly',
    id: 2
  }, {
    value: 'Bi-weekly',
    label: 'Bi-weekly',
    id: 3
  }, {
    value: 'Semi-monthly',
    label: 'Semi-monthly',
    id: 4
  }, {
    value: 'Monthly',
    label: 'Monthly',
    id: 5
  }, {
    value: 'Quarterly',
    label: 'Quarterly',
    id: 6
  }, {
    value: 'Semi-Annually',
    label: 'Semi-Annually',
    id: 7
  }, {
    value: 'Annual',
    label: 'Annual',
    id: 8
  }]

export default (state = frequencyTypeDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
