import React from 'react';
import { connect } from 'react-redux'
import CurrencyFormat from 'react-currency-format';
import CreatableSelect from 'react-select/lib/Creatable';
import expensesSelector from '../selectors/expensesSelector';
import List from './List';
import formatInUsd from '../helpers/formatInUsd';
import summarySelector from '../selectors/summarySelector';

export class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: props.expense ? props.expense.amount : '',
      expenseCategory: props.expense ? props.expense.expenseCategory : '',
      expenseCategoryId: props.expense ? props.expense.expenseCategoryId : '',
      selectActive: false,
      exists: false,
      selectedOption: false,
      isOpened: props.isOpened ? props.isOpened : false,
      error: ''
    }
  }
  onValueChange = ({ value }) => {
    this.setState(() => ({
      amount: value,
      inputActive: true
    }));
  }
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({
        amount: amount,
        formEntry: true
      }));
    }
  }
  onExpenseSelection = (selection) => {
    if (selection) {
      console.log(selection);
      if (expensesSelector(this.props.expenses, selection.expenseCategoryId)[0]) {
        this.setState({
          selectActive: true,
          expenseCategoryId: selection.expenseCategoryId,
          expenseCategory: selection.expenseCategory,
          value: '',
          exists: !!expensesSelector(this.props.expenses, selection.expenseCategoryId)[0],
          selectedOption: selection,
          amount: (
            this.props.expenses
              .filter(expense => expense.expenseCategoryId === selection.expenseCategoryId))[0].amount,
          id: (
            this.props.expenses
              .filter(expense => expense.expenseCategoryId === selection.expenseCategoryId))[0].id
        })
      }
      else {
        this.setState({
          selectActive: true,
          expenseCategoryId: selection.expenseCategoryId,
          expenseCategory: selection.label,
          value: '',
          exists: !!expensesSelector(this.props.expenses, selection.expenseCategoryId)[0],
          selectedOption: selection,
          amount: ''
        })
      }
    } else {
      this.setState(() => ({
        selection: '',
        target: '',
        name: '',
        value: '',
        exists: false,
        selectActive: false,
        selectedOption: '',
        amount: ''
      }))
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.amount === '') {
      this.setState(() => ({
        error: 'Please fill out all required fields'
      }));
    } else {
      expensesSelector(this.props.expenses, this.state.expenseCategoryId)[0]
        ? this.props.updateExpense(
          this.state.id,
          {
            expenseCategory: this.state.expenseCategory,
            description: this.state.expenseCategory,
            expenseCategoryId: this.state.expenseCategoryId,
            amount: this.state.amount
          })
        : this.props.addExpense(
          {
            expenseCategory: this.state.expenseCategory,
            description: this.state.expenseCategory,
            expenseCategoryId: this.state.expenseCategoryId,
            amount: this.state.amount
          })
      this.setState({
        amount: '',
        expenseCategory: '',
        expenseCategoryId: '',
        selectActive: false,
        exists: false,
        selectedOption: '',
        error: '',
        description: ''
      })
    }
    this.creatableSelect.focus();
  }
  render() {
    const word = this.state.exists ? 'Update' : 'Add';
    return (
      <div>
        <form
          autoComplete="off"
          className="form"
          onSubmit={this.onSubmit}>
          {this.state.error && <p className="form__error">{this.state.formType}</p>}

          <div className="picker">
            <CreatableSelect
              ref={el => { this.creatableSelect = el }}
              isClearable
              autoFocus={true}
              className="text"
              options={this.props.expenseCategory}
              value={this.state.selectedOption}
              onChange={this.onExpenseSelection}
              placeholder="Pick one or type to add" />
          </div>
          <CurrencyFormat
            className="text-input"
            thousandSeparator={true}
            prefix={'$'}
            placeholder="How much is it?"
            value={this.state.amount}
            onValueChange={this.onValueChange} />

          <div className="button__container">
            <button
              disabled={!this.state.selectActive}
              className="button">{word} Expense</button>

            <button
              disabled={!this.props.expenses.length >= 1}
              onClick={this.props.onComplete}
              className="button">Save Expenses</button>
          </div>
        </form>
        <div>
          {/* <hr />
          <List
            isOpened={false}
            parent={'Expenses'}
            propsToRender={this.props.propsToRender ? this.props.propsToRender : this.props.expenses}
            summaryToRender={formatInUsd(this.props.summary.totalCostOfLiving)}
            wordToRender={'Expenses'} /> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expense,
    expenseCategory: state.expenseCategory,
    summary: summarySelector(state.income, state.expense, state.goal)
  }
};
export default connect(mapStateToProps)(ExpenseForm);
