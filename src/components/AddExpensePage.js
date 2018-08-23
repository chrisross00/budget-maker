import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { FormHeader } from './FormHeader';
import { addExpense, updateExpense } from '../actions/expense';
import { addWhatIfExpense, updateWhatIfExpense } from '../actions/whatIf';

export class AddExpensePage extends React.Component {
  onComplete = () => {
    this.props.history.push('/');
  }
  addExpense = (expense) => {
    this.props.addExpense(expense);
    this.props.addWhatIfExpense(expense)
  }
  updateExpense = (id, expense) => {
    this.props.updateExpense(id, expense);
    this.props.updateWhatIfExpense(id, expense);
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Enter your expenses</h1>
          </div>
        </div>
        <div className="content-container shadow">
          <FormHeader
            formType={'expenses'} />
          <ExpenseForm
            onComplete={this.onComplete}
            isOpened={true}
            addExpense={this.addExpense}
            updateExpense={this.updateExpense}
            expense={this.props.expense} />
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
const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => { dispatch(addExpense(expense)) },
  updateExpense: (id, expense) => { dispatch(updateExpense(id, expense)) },
  addWhatIfExpense: (whatIfExpense) => { dispatch(addWhatIfExpense(whatIfExpense)) },
  updateWhatIfExpense: (id, whatIfExpense) => dispatch(updateWhatIfExpense(id, whatIfExpense))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensePage);
