import uuid from 'uuid';

export const addWhatIfGoal = (
  {
    description = '',
    target = '',
    amount = 0,
    projection = '',
    difference = 0,
    contributableAmount = 0,
    savings = 0
  } = {}
) => {
  return {
    type: 'ADD_WHATIF_GOAL',
    whatIfGoal: {
      id: uuid(),
      description,
      target,
      amount,
      projection,
      difference,
      contributableAmount,
      savings
    }
  };
};

export const addWhatIfIncome = (
  {
    incomeType = '',
    incomeTypeId = 0,
    description = '',
    amount = 0,
    frequencyType = '',
    frequencyTypeId = 0,
    multiplier = 1
  } = {}
) => ({
  type: 'ADD_WHATIF_INCOME',
  whatIfIncome: {
    id: uuid(),
    incomeType,
    incomeTypeId,
    description,
    amount,
    frequencyType,
    frequencyTypeId,
    multiplier
  }
});

export const addWhatIfExpense = (
  {
    expenseType = '',
    expenseCategory = '',
    description = '',
    expenseCategoryId = 0,
    amount = 0
  } = {}
) => ({
  type: 'ADD_WHATIF_EXPENSE',
  expense: {
    id: uuid(),
    expenseType,
    expenseCategory,
    description,
    expenseCategoryId,
    amount
  }
});

export const updateWhatIfIncome = (id, updates) => ({
  type: 'UPDATE_WHATIF_INCOME',
  id,
  updates
});

export const updateWhatIfExpense = (id, updates) => ({
  type: 'UPDATE_WHATIF_EXPENSE',
  id,
  updates
});

export const resetWhatIfExpense = (updates) => ({
  type: 'RESET_WHATIF_EXPENSE',
  updates
})

export const resetWhatIfIncome = (updates) => ({
  type: 'RESET_WHATIF_INCOME',
  updates
})

export const resetWhatIfGoal = (updates) => ({
  type: 'RESET_WHATIF_GOAL',
  updates
})

export const resetWhatIfs = () => ({
  type: 'RESET_WHATIFS'
})

export const storeWhatIf = (updates) => ({
  type: 'STORE_WHATIF',
  whatIfs: {
    id: uuid(),
    ...updates
  }
})
