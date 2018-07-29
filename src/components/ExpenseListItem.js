import React from 'react';

const ExpenseListItem = ({ expenseCategory, amount }) => (
  <div>
    {expenseCategory} - {amount}

  </div>
);

export default ExpenseListItem;
