import React from 'react';
import { connect } from 'react-redux';
import CreatableSelect from 'react-select/lib/Creatable';
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
      timeToHitGoal: ''
    }
  }
  handlePickerChange = (selection) => {
    if (selection) {
      if (selection.id === 1 || selection.id === 2) {
        this.setState(() => ({
          selection: selection.id,
          target: expensesTotal(this.props.expenses) * selection.duration,
          name: selection.label,
          value: expensesTotal(this.props.expenses) * selection.duration
        }))
      } else if (selection.id === 3) {
        this.setState(() => ({
          selection: selection.id,
          target: '',
          name: selection.label,
          value: ''
        }))
      }
    } else {
      this.setState(() => ({
        selection: '',
        target: '',
        name: '',
        value: ''
      }))
    }
  }
  onAmountChange = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      switch (id) {
        case 'target':
          return this.setState(() => ({ target: amount, changed: true }));
        case 'savings':
          return this.setState(() => ({ startingCash: amount, changed: true }));
        case 'contribution':
          return this.setState(() => ({ contributableAmount: amount, changed: true }));
        default:
          return;
      }
    }
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
  render() {
    const calculateWord = this.state.calculated ? "Re-c" : "C"
    const amount = numeral(this.state.amount).format('$0,0.00');
    const contributableAmount = numeral(this.state.contributableAmount).format('$0,0.00');
    const projection = numeral(this.state.projection).format('$0,0.00');
    const difference = numeral(Math.abs(this.state.difference)).format('$0,0.00');
    const monthlyDifference = numeral(Math.abs(this.state.difference / this.state.duration)).format('$0,0.00');
    const timeToHitGoal = Math.round(this.state.timeToHitGoal);
    return (
      <div className="content-container">
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <form
          autoComplete="off"
          className="form"
          onSubmit={this.onCalculate}>
          <label htmlFor="typePicker">Goal Type</label>
          <CreatableSelect
            isClearable
            options={this.props.emergencyFund}
            value={this.selectedOption}
            placeholder="Pick a goal type"
            onChange={this.handlePickerChange}
            id="typePicker" />
          <input
            className="text-input"
            placeholder="How much would you like to save?"
            value={this.state.target}
            onChange={this.onAmountChange}
            id="target" />
          <label htmlFor="savings">Current savings</label>
          <input
            className="text-input"
            placeholder="How much have you already saved?"
            value={this.state.startingCash}
            onChange={this.onAmountChange}
            id="savings" />
          <label htmlFor="contribution">Monthly payment</label>
          <input
            className="text-input"
            placeholder="How much can you save each month?"
            value={this.state.contributableAmount}
            onChange={this.onAmountChange}
            id="contribution" />
          <div>
            <button
              disabled={!this.state.changed}
              className="button">{calculateWord}alculate Goal</button>
          </div>
          {/* Change this here down to a Goal Summary */}
          {
            this.state.calculated
              ? <div>
                <h2>Here's a summary of your goal:</h2>
                <p>Minimum required savings: {amount} per month</p>
                <p>End of year total: {projection}</p>
                {this.state.willMakeGoal
                  ? (
                    <div className="goal--good">
                      <h3>You'll achieve your goal!</h3>
                      <p>You'll make your goal by the end of the year, and beat your goal by {difference}.</p>
                    </div>
                  )
                  : (
                    <div className="goal--bad">
                      <h3>You're off-track to achieve your goal.</h3>
                      <p>You are {difference} short of achieving your goal by the end of the year. Add {monthlyDifference} per month.</p>
                      <p>At your current rate, it will take {timeToHitGoal} months to achieve your goal.</p>
                    </div>
                  )}
              </div>
              : ''
          }
        </form>
        <div>
          <button className="button"
            disabled={!this.state.calculated}
            onClick={this.saveGoals}>Save Goal</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  goals: state.goals,
  emergencyFund: state.emergencyFund,
  expenses: state.expense,
  expenseTotal: expensesTotal(state.expense)
});

export default connect(mapStateToProps)(GoalsForm)
