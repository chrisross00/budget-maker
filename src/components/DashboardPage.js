import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddIncomePage from './AddIncomePage';
import IncomeList from './IncomeList';

const ExpenseDashboardPage = (props) => (
  <div className="content-container">
    <Link
      to="/income">
      <h1>Step 1. Add your income</h1>
    </Link>
    <IncomeList />
    <Link
      to="/expenses">
      <h1>Step 2. Add your monthly expenses</h1>
    </Link>
  </div>
);

const mapStateToProps = (state) => ({
  income: state.income
});


export default connect(mapStateToProps)(ExpenseDashboardPage);
