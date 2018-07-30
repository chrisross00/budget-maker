import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ExpenseInput from './ExpenseInput';

export class ExpenseForm extends React.Component {
  render() {
    return (
      <form
        autoComplete="off"
        className="form">
        {this.props.error && <p className="form__error">{this.props.error}</p>}
        {
          this.props.expenseCategory.map(
            (item) => {
              return <ExpenseInput
                key={item.expenseCategoryId} {...item} />
            })
        }
        <div>
          <Link
            className="button"
            to="/">
            Save All Expenses</Link>
        </div>
      </form>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    expenseCategory: state.expenseCategory
  }
};

export default connect(mapStateToProps)(ExpenseForm);
