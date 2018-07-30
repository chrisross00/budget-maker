import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';

const ExpenseList = ({ expense }) => (
  <div>
    <div className="list-header">
      <div className="show-for-desktop">Monthly Expenses</div>
      <div className="show-for-mobile">Monthly Expenses</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {expense.length === 0
        ? (
          <div className="list-item list-item-message">
            <span>No expenses added yet</span>
          </div>
        )
        : (expense.map((expense) => {
          return <ExpenseListItem {...expense} key={expense.id} />
        })
        )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  expense: state.expense
});

export default connect(mapStateToProps)(ExpenseList)
