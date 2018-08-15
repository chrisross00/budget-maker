import React from 'react';
import SummaryList from './SummaryList';
import List from './List';

export const ExpenseDashboardPage = () => (
  <div className="content-container">
    <SummaryList />
    <List
      parent={'income'} />
    <List
      parent={'expenses'} />
    <List
      parent={'goals'} />
  </div>
);

export default ExpenseDashboardPage;
