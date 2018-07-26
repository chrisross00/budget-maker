import React from 'react';
import { connect } from 'react-redux';
import { addIncome } from '../actions/income';
import IncomeForm from './IncomeForm';


export class AddIncomePage extends React.Component {
  onSubmit = (income) => {
    this.props.addIncome(income);
    this.props.history.push('/');

    console.log('hit parent onSubmit');
  }
  render() {
    return (
      <div>
        <h2>Enter your income</h2>
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
