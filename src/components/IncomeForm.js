import React from 'react';
import { connect } from 'react-redux';
import CreatableSelect from 'react-select/lib/Creatable';
import CurrencyFormat from 'react-currency-format';
import incomeSelector from '../selectors/incomeSelector';


export class IncomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      incomeType: this.props.income ? this.props.income.map((inc) => ({ value: inc.description, label: inc.description })) : 'Primary',
      incomeTypeId: 1,
      description: '',
      amount: '',
      // frequencyType: this.props.frequencyType ? this.props.frequencyType.frequencyType : 'Bi-weekly',
      // frequencyTypeId: this.props.frequencyType ? this.props.frequencyType.frequencyTypeId : 3,
      multiplier: 1,
      selectActive: false,
      selectedOption: false,
      selectedIncomeType: false,
      valueEntered: false,
      incomeSelected: false,
      error: ''
    };
  }
  onValueChange = ({ value }) => { this.setState(() => ({ amount: value, valueEntered: true })) }
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({
      description,
      selectActive: true
    }));
  }
  onFrequencySelection = (frequencyType) => {
    if (frequencyType) {
      this.setState(() => ({
        frequencyType: frequencyType.value,
        selectedFrequencyType: frequencyType,
        frequencyTypeId: frequencyType.id,
        multiplier: frequencyType.multiplier
      }));
    } else {
      this.setState(() => ({
        selectedFrequencyType: ''
      }));
    }
  }
  onIncomeSelection = (selection) => {
    if (selection) {
      if (incomeSelector(this.props.income, selection.value)[0]) {
        this.setState({
          amount: (
            this.props.income
              .filter(inc => inc.description === selection.value))[0].amount,
          description: selection.value,
          selectActive: selection,
          selectedIncomeType: selection,
          incomeSelected: true,
          id: (this.props.income
            .filter(inc => inc.description === selection.value))[0].id
        });
      }
      else {
        this.setState({
          amount: '',
          value: '',
          description: selection.value,
          selectActive: selection,
          selectedIncomeType: selection
        })
      }
    } else {
      this.setState({
        amount: '',
        value: '',
        description: '',
        selectActive: '',
        selectedIncomeType: ''
      })
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: 'Please fill out all required fields'
      }));
    } else {
      incomeSelector(this.props.income, this.state.description)[0]
        ? this.props.updateIncome(
          this.state.id,
          {
            incomeType: this.state.description,
            incomeTypeId: this.state.incomeTypeId,
            description: this.state.description,
            amount: this.state.amount,
            frequencyType: this.state.frequencyType,
            frequencyTypeId: this.state.frequencyTypeId,
            multiplier: this.state.multiplier
          })
        : this.props.addIncome({
          incomeType: this.state.description,
          incomeTypeId: this.state.incomeTypeId,
          description: this.state.description,
          amount: this.state.amount,
          frequencyType: this.state.frequencyType,
          frequencyTypeId: this.state.frequencyTypeId,
          multiplier: this.state.multiplier
        })
    }
    this.setState({
      amount: '',
      value: '',
      description: '',
      selectActive: '',
      selectedIncomeType: ''
    })
  }
  render() {
    return (
      <div>
        <form
          autoComplete="off"
          className="form"
          onSubmit={this.onSubmit}>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <div className="picker">
            <CreatableSelect
              className="text"
              isClearable
              placeholder="Pick or type to add income"
              options={this.state.incomeType}
              value={this.state.selectedIncomeType}
              onChange={this.onIncomeSelection} />
          </div>
          <CurrencyFormat
            name="paycheck"
            className="text-input"
            thousandSeparator={true}
            prefix={'$'}
            placeholder="What do you earn per check?"
            value={this.state.amount}
            onValueChange={this.onValueChange} />
          {/* <input
            className="text-input"
            placeholder="Who pays you?"
            value={this.state.description}
            onChange={this.onDescriptionChange} /> */}
          <div className="picker">
            <CreatableSelect
              isClearable
              className="text"
              placeholder="How often do you get paid?"
              options={this.props.frequencyType}
              value={this.state.selectedFrequencyType}
              onChange={this.onFrequencySelection} />
          </div>
          <div>
            <button
              disabled={!this.state.incomeSelected && !this.state.valueEntered}
              className="button">Save Income</button>
          </div>
        </form>

      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    income: state.income,
    incomeType: state.incomeType,
    frequencyType: state.frequencyType
  }
};

export default connect(mapStateToProps)(IncomeForm);
