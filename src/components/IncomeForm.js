import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

export class IncomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incomeType: props.income ? props.income.incomeType : 'Primary',
      incomeTypeId: props.income ? props.income.incomeTypeId : 1,
      description: props.income ? props.income.description : '',
      amount: props.income ? (props.expense.amount / 100).toString() : '',
      frequencyType: props.income ? props.income.frequencyType : 'Bi-weekly',
      frequencyTypeId: props.income ? props.income.frequencyTypeId : 3,
      error: ''
    };
  }
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  }
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  }
  onFrequencySelection = (frequencyType) => {
    this.setState(() => ({
      frequencyType: frequencyType.type,
      frequencyTypeId: frequencyType.id
    }));
  }
  onIncomeSelection = (incomeType) => {
    this.setState(() => ({
      incomeType: incomeType.type,
      incomeTypeId: incomeType.id
    }));
  }
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: 'Please fill out all required fields'
      }));
    } else {

      this.props.onSubmit({
        incomeType: this.state.incomeType,
        incomeTypeId: this.state.incomeTypeId,
        description: this.state.description,
        amount: this.state.amount,
        frequencyType: this.state.frequencyType,
        frequencyTypeId: this.state.frequencyTypeId
      });
    }
  }
  render() {
    return (
      <div className="content-container">
        <form
          className="form"
          onSubmit={this.onSubmit}>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <input
            type="integer"
            className="text-input"
            placeholder="How much do you make per paycheck?"
            value={this.state.amount}
            onChange={this.onAmountChange} />
          <input
            className="text-input"
            placeholder="Enter a description"
            value={this.state.description}
            onChange={this.onDescriptionChange} />
          <div className="picker">
            <Select
              placeholder="How often do you get paid?"
              options={this.props.frequencyType}
              value={this.selectedOption}
              onChange={this.onFrequencySelection} />
          </div>
          <div className="picker">
            <Select
              placeholder="Is this your primary or secondary income?"
              options={this.props.incomeType}
              onChange={this.onIncomeSelection} />
          </div>
          <div>
            <button className="button">Save Income</button>

          </div>
        </form>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    incomeType: state.incomeType,
    frequencyType: state.frequencyType
  }
};

export default connect(mapStateToProps)(IncomeForm);
