import uuid from 'uuid';

export const addIncome = (
  {
    type = 0,
    description = '',
    amount = 0,
    frequency = ''
  } = {}
) => ({
  type: 'ADD_INCOME',
  income: {
    id: uuid(),
    type,
    description,
    amount,
    frequency
  }
});
