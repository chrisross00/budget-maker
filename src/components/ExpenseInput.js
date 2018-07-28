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
      normalAmount: this.props.expense ? (this.props.expense.normalAmount / 100).toString() : '',
      changed: false,
      committed: false
    }
  }
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ normalAmount: amount, changed: true }));
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    let holder = [];
    let newExpense = {
      expenseType: this.props.expenseTypeId,
      expenseCategory: this.props.expenseCategory,
      expenseCategoryId: this.props.expenseCategoryId,
      normalAmount: this.state.normalAmount,
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
          value={this.state.normalAmount} />
        {this.state.normalAmount
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
