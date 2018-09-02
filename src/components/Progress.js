import React from 'react';

export const Progress = ({ showIncome, showExpenses, showGoals }) => (

  <div className="shadow--light" >
    <div className="content-container--subcontainer">
      <p className={showIncome ? 'is-active' : 'is-active-false'}>1. Income</p>
      <p className={showExpenses ? 'is-active' : 'is-active-false'}>2. Expenses</p>
      <p className={showGoals ? 'is-active' : 'is-active-false'}>3. Goals</p>
    </div>
  </div>
)

export default Progress
