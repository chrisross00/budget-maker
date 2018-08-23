import uuid from 'uuid';

export const addIncome = (
  {
    incomeType = '',
    incomeTypeId = 0,
    description = '',
    amount = 0,
    frequencyType = '',
    frequencyTypeId = 0
  } = {}
) => ({
  type: 'ADD_INCOME',
  income: {
    id: uuid(),
    incomeType,
    incomeTypeId,
    description,
    amount,
    frequencyType,
    frequencyTypeId
  }
});

export const updateIncome = (id, updates) => ({
  type: 'UPDATE_INCOME',
  id,
  updates
});
