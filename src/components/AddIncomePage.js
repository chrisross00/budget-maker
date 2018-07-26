import React from 'react';
import { connect } from 'react-redux';
import { addIncome } from '../actions/income';
import IncomeForm from './IncomeForm';


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
            <h2 className="page-header__title">Enter your income</h2>
          </div>
        </div>
        <IncomeForm
          onSubmit={this.onSubmit} />
      </div>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  addIncome: (income) => dispatch(addIncome(income))
});


export default connect(undefined, mapDispatchToProps)(AddIncomePage);
