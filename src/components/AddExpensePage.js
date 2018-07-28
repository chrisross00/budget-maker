import React from 'react';
import ExpenseForm from './ExpenseForm';

export class AddExpensePage extends React.Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h2 className="page-header__title">Enter your expenses</h2>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  };
};


export default AddExpensePage;
