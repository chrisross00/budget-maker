import React from 'react';
import { Link } from 'react-router-dom';
import IncomeList from './IncomeList';
import ExpenseList from './ExpenseList';
import GoalList from './GoalList';
import SummaryList from './SummaryList';

export const ExpenseDashboardPage = () => (
  <div className="content-container">
    <SummaryList />
    <Link
      to="/income">
      <h2>Step 1. Add your income</h2>
      <hr />
    </Link>
    <IncomeList />
    <Link
      to="/expenses">
      <h2>Step 2. Add your monthly expenses</h2>
    </Link>
    <ExpenseList />
    <Link
      to="/goals">
      <h2>Step 3. Define your goals</h2>
    </Link>
    <GoalList />
  </div>
);

export default ExpenseDashboardPage;
