import uuid from 'uuid';

export const addIncome = (
  {
    incomeType = '',
    incomeTypeId = 0,
    description = '',
    amount = 0,
    frequencyType = '',
    frequencyTypeId
  } = {}
) => ({
  type: 'ADD_INCOME',
  income: {
    incomeId: uuid(),
    incomeType,
    incomeTypeId,
    description,
    amount,
    frequencyType,
    frequencyTypeId
  }
});
