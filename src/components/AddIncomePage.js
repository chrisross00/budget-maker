import React from 'react';
import { connect } from 'react-redux';
import { addIncome } from '../actions/income';
import IncomeForm from './IncomeForm';
import { FormHeader } from './FormHeader';


export class AddIncomePage extends React.Component {
  onSubmit = (income) => {
    this.props.addIncome(income);
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Enter your income</h1>
          </div>
        </div>
        <div className="content-container shadow">
          <FormHeader
            formType={'income'} />
          <IncomeForm
            onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  addIncome: (income) => dispatch(addIncome(income))
});


export default connect(undefined, mapDispatchToProps)(AddIncomePage);
