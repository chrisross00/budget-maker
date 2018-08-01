import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import ExpenseListItem from './ExpenseList';
import NewExpenseForm from './NewExpenseForm';

export class AddExpensePage extends React.Component {
  onComplete = () => {
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Enter your expenses</h1>
          </div>
        </div>
        <NewExpenseForm
          onComplete={this.onComplete} />
        {/* <ExpenseForm
            onSubmit={this.onSubmit} /> */}
        <div className="content-container">
          <ExpenseListItem {...this.props.expenses} />
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    expense: state.expense
  }
}

export default connect(mapStateToProps)(AddExpensePage);
