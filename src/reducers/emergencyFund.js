const defaultEmergencyFund = [
  {
    id: 1,
    label: '3 month emergency fund',
    name: '3 month',
    amount: 0,
    duration: 3,
    description: 'Three month emergency fund, normal cost of living'
  }, {
    id: 2,
    label: '6 month emergency fund',
    name: '6 month',
    amount: 0,
    duration: 6,
    description: 'Six month emergency fund, normal cost of living'
  },
  {
    id: 3,
    label: 'Savings Goal',
    name: 'Savings Goal',
    amount: 0,
    duration: 6,
    description: 'Custom savings goal'
  }
];

export default (state = defaultEmergencyFund, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
