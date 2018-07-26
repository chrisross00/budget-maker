import React from 'react';
import { connect } from 'react-redux';
import Picker from './Picker';

export class IncomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'Primary',
      description: props.income ? props.income.description : '',
      amount: props.income ? (props.expense.amount / 100).toString() : '',
      frequency: props.income ? props.income.frequency : 'Bi-weekly',
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
  onFrequencyChange = (e) => {
    const frequency = e.target.value;
    this.setState(() => ({ frequency }));
  }
  toggleSelected = (e) => {
    console.log(e.target.value);
  }
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: 'Please fill out all required fields'
      }));
    } else {

      this.props.onSubmit({
        type: 'Primary',
        description: this.state.description,
        amount: this.state.amount,
        frequency: this.state.frequency
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
            type="number"
            className="text-input"
            placeholder="How much do you make per paycheck?"
            value={this.state.amount}
            onChange={this.onAmountChange} />
          <input
            className="text-input"
            placeholder="Enter a description"
            value={this.state.description}
            onChange={this.onDescriptionChange} />
          <Picker
            title="How often do you get paid?"
            list={this.props.frequencyType}
            toggleSelected={this.toggleSelected} />
          <Picker
            title="Is this your primary or secondary income?"
            list={this.props.incomeType}
            onClick={this.toggleSelected} />
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
