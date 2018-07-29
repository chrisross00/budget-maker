import React from 'react';
import numeral from 'numeral';

const ExpenseListItem = ({ expenseCategory, amount }) => (
  <div className="list-item">
    <h4>
      {expenseCategory}
    </h4>
    <span className="list-item__data"> {numeral(amount).format('$0,0.00')} </span>
  </div>
);

export default ExpenseListItem;
