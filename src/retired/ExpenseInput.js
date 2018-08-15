import React from 'react';
import { connect } from 'react-redux';
import { addExpense, updateExpense } from '../actions/expense';

class ExpenseInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseType: this.props.expense ? this.props.expense.expenseType : '',
      expenseCategory: this.props.expense ? this.props.expense.expenseCategory : '',
      expenseCategoryId: this.props.expense ? this.props.expense.expenseCategoryId : 0,
      amount: this.props.expense ? (this.props.expense.amount / 100).toString() : '',
      changed: false,
      committed: false
    }
  }
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount: amount, changed: true }));
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    let holder = [];
    let newExpense = {
      expenseType: this.props.expenseTypeId,
      expenseCategory: this.props.expenseCategory,
      expenseCategoryId: this.props.expenseCategoryId,
      amount: this.state.amount,
    }
    if (this.props.expenses.length !== 0) {
      this.props.expenses.map((expense) => {
        holder.push(expense.expenseCategoryId);
      });
      if (holder.includes(this.props.expenseCategoryId)) {
        this.props.updateExpense(this.props.expenseCategoryId, newExpense);
      } else {
        this.props.addExpense(newExpense);
      }
    } else {
      this.props.addExpense(newExpense);
    }
    this.setState(() => ({
      changed: false,
      committed: true
    }))
  };
  render() {
    const updateSaveWord = (this.state.committed) ? "Update" : "Save"
    return (
      <div className="form">
        <input
          className="text-input"
          type="number"
          placeholder={`How much do you pay for ${this.props.label}?`}
          id={this.props.expenseCategoryId}
          onChange={this.onAmountChange}
          value={this.state.amount} />
        {this.state.amount
          ? (<button className="button"
            onClick={this.onSubmit}
            disabled={!this.state.changed}>{updateSaveWord} Expense</button>)
          : ''}
      </div>
    )
  };
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expense
  }
};

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => { dispatch(addExpense(expense)) },
  updateExpense: (id, expense) => { dispatch(updateExpense(id, expense)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseInput);
