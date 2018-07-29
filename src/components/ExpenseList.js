import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';

const ExpenseList = ({ expense }) => (
  <div>
    <div className="list-header">
      <h3>ExpenseList</h3>
    </div>
    <div>
      {expense.length === 0
        ? "No expenses added yet"
        : expense.map((expense) => {
          return <ExpenseListItem {...expense} key={expense.id} />
        })
      }
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  expense: state.expense
});

export default connect(mapStateToProps)(ExpenseList)
