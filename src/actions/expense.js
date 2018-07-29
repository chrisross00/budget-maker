import uuid from 'uuid';

export const addExpense = (
  {
    expenseType = '',
    expenseCategory = '',
    expenseCategoryId = 0,
    amount = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    expenseType,
    expenseCategory,
    expenseCategoryId,
    amount
  }
});

export const updateExpense = (id, updates) => ({
  type: 'UPDATE_EXPENSE',
  id,
  updates
});
