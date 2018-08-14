import React from 'react';
import numeral from 'numeral';

const ExpenseListItem = ({ expenseCategory, amount }) => (
  <div className="list-item">
    <h3 className="list-item__solotitle">
      {expenseCategory}
    </h3>
    <h3 className="list-item__data"> {numeral(amount).format('$0,0.00')} </h3>
  </div>
);

export default ExpenseListItem;
