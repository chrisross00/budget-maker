import React from 'react';
import { connect } from 'react-redux';
import CreatableSelect from 'react-select/lib/Creatable';
import CurrencyFormat from 'react-currency-format';
import numeral from 'numeral';
import expensesTotal from '../selectors/total-selector';

class GoalsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.goal ? this.props.goal.name : '',
      target: this.props.goal ? this.props.goal.target : '',
      amount: this.props.goal ? this.props.goal.amount : '',
      projection: this.props.goal ? this.props.goal.projection : '',
      difference: this.props.goal ? this.props.goal.difference : '',
      contributableAmount: this.props.goal ? this.props.goal.contributableAmount : '',
      changed: false,
      calculated: false,
      duration: '',
      error: '',
      startingCash: '',
      willMakeGoal: false,
      pickerSelection: '',
      timeToHitGoal: '',
      skipGoals: this.props.onSkipGoals ? true : false
    }
  }
  handlePickerChange = (selection) => {
    if (selection) {
      const dur = selection.value[0][0];
      if (isNaN(dur)) {
        this.setState(() => ({
          selection: selection.id,
          target: '',
          name: selection.label,
          value: '',
          pickerSelection: selection
        }))
      } else {
        this.setState(() => ({
          selection: selection.id,
          target: expensesTotal(this.props.expenses) * parseFloat(dur),
          name: selection.label,
          value: expensesTotal(this.props.expenses) * parseFloat(dur),
          pickerSelection: selection
        }))
      }
    } else {
      this.setState(() => ({
        selection: '',
        target: '',
        name: '',
        value: selection,
        pickerSelection: selection
      }))
    }
  }
  onTargetChange = ({ value }) => {
    this.setState({
      target: value,
      changed: true
    });
  }
  onStartingCashChange = ({ value }) => {
    this.setState({
      startingCash: value,
      changed: true
    });
  }
  onContributableAmountChange = ({ value }) => {
    this.setState({
      contributableAmount: value,
      changed: true
    });
  }
  onFrequencySelection = (frequencyType) => {
    this.setState(() => ({
      frequencyType: frequencyType.type,
      frequencyTypeId: frequencyType.id
    }));
  }
  onCalculate = (e) => {
    e.preventDefault();
    if (this.state.target === ''
      || this.state.startingCash === ''
      || this.state.contributableAmount === '') {
      this.setState(() => ({
        error: 'Please fill out all required fields'
      }));
    } else if (parseFloat(this.state.startingCash) >= parseFloat(this.state.target)) {
      this.setState(() => ({
        error: 'You already beat your goal — looks like you already have it in savings!'
      }))
    }
    else {
      const date = new Date();
      const currentMonth = date.getMonth();
      const endOfYear = 11;
      const dateDiff = (endOfYear - currentMonth);
      const calculatedMonthlyRequired = parseFloat((this.state.target - this.state.startingCash) / dateDiff);
      const contributionProjection = parseFloat(this.state.contributableAmount * dateDiff)
      const startingCash = parseFloat(this.state.startingCash)
      const calculatedProjectedAmount = parseFloat(startingCash + contributionProjection);
      const calculatedDifferential = parseFloat(this.state.target - calculatedProjectedAmount);
      const willMakeGoal = calculatedProjectedAmount >= this.state.target ? true : false;
      const timeToHitGoal = parseFloat(this.state.target - this.state.startingCash) / parseFloat(this.state.contributableAmount)

      this.setState(() => ({
        calculated: true,
        changed: false,
        amount: calculatedMonthlyRequired,
        projection: calculatedProjectedAmount,
        difference: calculatedDifferential,
        willMakeGoal: willMakeGoal,
        duration: dateDiff,
        timeToHitGoal: timeToHitGoal,
        error: ''
      }));
    }
  }
  saveGoals = () => {
    this.props.onSaveGoal({
      name: this.state.name,
      target: this.state.target,
      amount: this.state.amount,
      projection: this.state.projection,
      difference: this.state.difference,
      contributableAmount: this.state.contributableAmount,
      startingCash: this.state.startingCash
    });
  }
  onSkipGoals = () => {
    this.props.onSkipGoals();
  }
  render() {
    const calculateWord = this.state.calculated ? "Re-c" : "C"
    const target = numeral(this.state.target).format('$0,0.00');
    const amount = numeral(this.state.amount).format('$0,0.00');
    const contributableAmount = numeral(this.state.contributableAmount).format('$0,0.00');
    const projection = numeral(this.state.projection).format('$0,0.00');
    const difference = numeral(Math.abs(this.state.difference)).format('$0,0.00');
    const monthlyDifference = numeral(Math.abs(this.state.difference / this.state.duration)).format('$0,0.00');
    const timeToHitGoal = Math.round(this.state.timeToHitGoal);
    return (
      <div>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <form
          autoComplete="off"
          className="form"
          onSubmit={this.onCalculate}>
          <label htmlFor="typePicker">Goal Type</label>
          <CreatableSelect
            isClearable
            options={this.props.goalType}
            value={this.state.pickerSelection}
            placeholder="Pick a goal type"
            onChange={this.handlePickerChange}
            id="typePicker" />

          <CurrencyFormat
            id="target"
            className="text-input"
            thousandSeparator={true}
            prefix={'$'}
            placeholder="How much will you save?"
            value={this.state.target}
            onValueChange={this.onTargetChange} />

          <label htmlFor="savings">Current savings</label>

          <CurrencyFormat
            id="savings"
            className="text-input"
            thousandSeparator={true}
            prefix={'$'}
            placeholder="Have you saved up already?"
            value={this.state.startingCash}
            onValueChange={this.onStartingCashChange} />
          <label htmlFor="contribution">Monthly payment</label>

          <CurrencyFormat
            id="contribution"
            className="text-input"
            thousandSeparator={true}
            prefix={'$'}
            placeholder="How much can you save monthly?"
            value={this.state.contributableAmount}
            onValueChange={this.onContributableAmountChange} />
          <div className="button__container">
            <button
              disabled={!this.state.changed}
              className="button">{calculateWord}alculate Goal</button>
            <button className="button"
              disabled={!this.state.calculated}
              onClick={this.saveGoals}>Save Goal</button>

          </div>
          {/* Change this here down to a Goal Summary */}
          {
            this.state.calculated
              ? <div>
                <h2>Here's a summary of your goal:</h2>
                <p>If you save <strong>{contributableAmount}</strong> per month, you'll have <strong>{projection}</strong> by the end of the year.</p>
                <p>You need to save at least <strong>{amount}</strong> per month to save <strong>{target}</strong> by the end of the year.</p>
                {this.state.willMakeGoal
                  ? (
                    <div className="goal--good">
                      <p>You'll make your goal by the end of the year, and beat your goal by {difference}.</p>
                    </div>
                  )
                  : (
                    <div className="goal--bad">
                      <p>You are <strong>{difference}</strong> short of achieving your goal by the end of the year. Add <strong>{monthlyDifference}</strong> per month.</p>
                      <p>At your current rate, it will take <strong>{timeToHitGoal}</strong> months to achieve your goal.</p>
                    </div>
                  )}
              </div>
              : ''
          }{
            this.state.skipGoals
              ? <div className="button__container">
                <button className="button"
                  onClick={this.props.onSkipGoals}>Skip</button>
              </div>
              : ''
          }
        </form>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    goals: state.goals,
    emergencyFund: state.emergencyFund,
    goalType: state.goalType,
    expenses: state.expense,
    expenseTotal: expensesTotal(state.expense)
  }
};

export default connect(mapStateToProps)(GoalsForm)
