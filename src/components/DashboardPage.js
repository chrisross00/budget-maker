import React from 'react';
import IncomeList from './IncomeList';
import ExpenseList from './ExpenseList';
import GoalList from './GoalList';
import SummaryList from './SummaryList';

export const ExpenseDashboardPage = () => (
  <div className="content-container">
    <SummaryList />
    <IncomeList />
    <ExpenseList />
    <GoalList />
  </div>
);

export default ExpenseDashboardPage;
