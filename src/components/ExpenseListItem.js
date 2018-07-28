import React from 'react';

const ExpenseListItem = ({ expenseCategory, normalAmount }) => (
  <div>
    {expenseCategory} - {normalAmount}

  </div>
);

export default ExpenseListItem;
