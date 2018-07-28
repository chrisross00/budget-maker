import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddIncomePage from './AddIncomePage';
import IncomeList from './IncomeList';
import ExpenseList from './ExpenseList';

const ExpenseDashboardPage = (props) => (
  <div className="content-container">
    <Link
      to="/income">
      <h2>Step 1. Add your income</h2>
    </Link>
    <IncomeList />
    <Link
      to="/expenses">
      <h2>Step 2. Add your monthly expenses</h2>
    </Link>
    <ExpenseList />
  </div>
);

const mapStateToProps = (state) => ({
  income: state.income
});


export default connect(mapStateToProps)(ExpenseDashboardPage);
