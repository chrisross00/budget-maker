import React from 'react';
import { connect } from 'react-redux';
import { addIncome, updateIncome } from '../actions/income';
import IncomeForm from './IncomeForm';
import List from './List';

import { FormHeader } from './FormHeader';
import formatInUsd from '../helpers/formatInUsd';


export class AddIncomePage extends React.Component {
  addIncome = (income) => {
    this.props.addIncome(income);
    this.props.history.push('/');
  }
  updateIncome = (id, income) => {
    this.props.updateIncome(id, income);
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
            addIncome={this.addIncome}
            updateIncome={this.updateIncome}
            income={this.props.income} />
          <List
            isOpened={true}
            parent={'Income'}
            propsToRender={this.props.income}
            wordToRender={'Income'} />
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    income: state.income
  }
}
const mapDispatchToProps = (dispatch) => ({
  addIncome: (income) => dispatch(addIncome(income)),
  updateIncome: (id, income) => dispatch(updateIncome(id, income))
});


export default connect(mapStateToProps, mapDispatchToProps)(AddIncomePage);
