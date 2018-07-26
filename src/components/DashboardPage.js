import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddIncomePage from './AddIncomePage';
import IncomeList from './IncomeList';

const ExpenseDashboardPage = (props) => (
  <div className="content-container">
    <Link
      to="/income">
      <h1>Add your income</h1>
    </Link>
    <IncomeList />
  </div>
);

const mapStateToProps = (state) => ({
  income: state.income
});


export default connect(mapStateToProps)(ExpenseDashboardPage);
