const frequencyTypeDefaultState = [
  {
    value: 'Daily',
    label: 'Daily',
    id: 0,
    multiplier: 1
  }, {
    value: 'Weekly',
    label: 'Weekly',
    id: 1,
    multiplier: 4
  }, {
    value: 'Bi-weekly',
    label: 'Bi-weekly',
    id: 2,
    multiplier: 2
  }, {
    value: 'Semi-monthly',
    label: 'Semi-monthly',
    id: 3,
    multiplier: 2
  }, {
    value: 'Monthly',
    label: 'Monthly',
    id: 4,
    multiplier: 1
  }, {
    value: 'Quarterly',
    label: 'Quarterly',
    id: 5,
    multiplier: 0.25
  }, {
    value: 'Semi-Annually',
    label: 'Semi-Annually',
    id: 6,
    multiplier: 0.16667
  }, {
    value: 'Annual',
    label: 'Annual',
    id: 7,
    multiplier: 0.08333
  }]

export default (state = frequencyTypeDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
