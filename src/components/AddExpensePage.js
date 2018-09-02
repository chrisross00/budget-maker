import React from 'react';
import { connect } from 'react-redux';
import List from './List';
import ExpenseForm from './ExpenseForm';
import { FormHeader } from './FormHeader';
import formatInUsd from '../helpers/formatInUsd';
import summarySelector from '../selectors/summarySelector';
import { startAddExpense, startUpdateExpense } from '../actions/expense';
import { addWhatIfExpense, updateWhatIfExpense } from '../actions/whatIf';

export class AddExpensePage extends React.Component {
  onComplete = () => {
    this.props.history.push('/');
  }
  addExpense = (expense) => {
    console.log('addExpense prop');
    this.props.startAddExpense(expense);
    this.props.addWhatIfExpense(expense)
  }
  updateExpense = (id, expense) => {
    this.props.startUpdateExpense(id, expense);
    this.props.updateWhatIfExpense(id, expense);
  }
  render() {
    return (
      <div className="content-container--main fadein">
        <div className="content-container--card shadow">
          <FormHeader
            formType={'expenses'} />
          <ExpenseForm
            onComplete={this.onComplete}
            isOpened={true}
            addExpense={this.addExpense}
            updateExpense={this.updateExpense}
            expense={this.props.expenses} />
        </div>
        <div className="content-container">
          <List
            isOpened={true}
            parent={'Expenses'}
            propsToRender={this.props.expenses}
            summaryToRender={formatInUsd(this.props.summary.totalCostOfLiving)}
            wordToRender={'Expenses'} />
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    expenses: state.expense,
    summary: summarySelector(state.income, state.expense, state.goal)
  }
}
const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense)),
  startUpdateExpense: (id, expense) => dispatch(startUpdateExpense(id, expense)),
  addWhatIfExpense: (whatIfExpense) => { dispatch(addWhatIfExpense(whatIfExpense)) },
  updateWhatIfExpense: (id, whatIfExpense) => dispatch(updateWhatIfExpense(id, whatIfExpense))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensePage);
