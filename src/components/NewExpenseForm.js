import React from 'react';
import { connect } from 'react-redux'
import numeral from 'numeral';
import CreatableSelect from 'react-select/lib/Creatable';
import ExpenseListItem from './ExpenseList';
import { addExpense } from '../actions/expense';
import { updateExpense } from '../actions/expense';
import expensesSelector from '../selectors/expensesSelector';

export class NewExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: props.expense ? props.expense.amount : '',
      expenseCategory: props.expense ? props.expense.expenseCategory : '',
      expenseCategoryId: props.expense ? props.expense.expenseCategoryId : '',
      expenseType: props.expense ? props.expense.expenseType : '',
      selectActive: false,
      inputActive: false,
      formEntry: false,
      exists: false,
      error: ''
    }
  }
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({
        amount: amount,
        formEntry: true,
        inputActive: true
      }));
    }
  }
  onExpenseSelection = (selection) => {
    if (selection) {
      this.setState({
        selectActive: true,
        expenseCategoryId: selection.expenseCategoryId,
        expenseCategory: selection.expenseCategory,
        expenseType: selection.expenseType,
        value: '',
        exists: !!expensesSelector(this.props.expenses, selection.expenseCategoryId)[0]
      })
    } else {
      this.setState(() => ({
        selection: '',
        target: '',
        name: '',
        value: '',
        exists: false,
        selectActive: false
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
          this.state.expenseCategoryId,
          {
            expenseType: this.state.expenseType,
            expenseCategory: this.state.expenseCategory,
            expenseCategoryId: this.state.expenseCategoryId,
            amount: this.state.amount
          })
        : this.props.addExpense(
          {
            expenseType: this.state.expenseType,
            expenseCategory: this.state.expenseCategory,
            expenseCategoryId: this.state.expenseCategoryId,
            amount: this.state.amount
          })
      this.setState({
        amount: '',
        expenseCategory: '',
        expenseCategoryId: '',
        expenseType: '',
        selectActive: false,
        formEntry: false,
        exists: false,
        selectedOption: '',
        error: ''
      })
    }
  }
  render() {
    const word = this.state.exists ? 'Update' : 'Add';
    return (
      <div>
        <div className="content-container">
          <form
            autoComplete="off"
            className="form"
            onSubmit={this.onSubmit}>
            {this.state.error && <p className="form__error">{this.state.error}</p>}

            <input
              type="number"
              className="text-input"
              value={this.state.amount}
              onChange={this.onAmountChange}
              placeholder="Enter an amount" />

            <div className="picker">
              <CreatableSelect
                isClearable
                options={this.props.expenseCategory}
                value={this.selectedOption}
                onChange={this.onExpenseSelection}
                placeholder="Select the type of expense" />
            </div>
            <div>
              <button
                disabled={!this.state.selectActive}
                className="button">{word} Expense</button>
            </div>
          </form>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expense,
    expenseCategory: state.expenseCategory
  }
};
const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => { dispatch(addExpense(expense)) },
  updateExpense: (id, expense) => { dispatch(updateExpense(id, expense)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewExpenseForm);
