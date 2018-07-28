import React from 'react';
import { connect } from 'react-redux';
import CreatableSelect from 'react-select/lib/Creatable';
import numeral from 'numeral';
import expensesTotal from '../selectors/expenses-total';

class GoalsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.goal ? this.props.goal.name : '',
      target: this.props.goal ? this.props.goal.target : '',
      monthlyRequiredAmount: this.props.goal ? this.props.goal.monthlyRequiredAmount : '',
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
      terminateOptions: [{ id: 4, label: 'End of year' }, { id: 5, label: 'Whenever' }],
      terminateSelection: 0,
      timeToHitGoal: ''
    }
  }
  handlePickerChange = (selection) => {
    console.log('HANDLEPICKERCHANGE: else', selection);
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
      } else if (selection.id === 4 || selection.id == 5) {
        this.setState(() => ({
          selection: selection.id,
          terminateSelection: selection.id
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
      || this.state.contributableAmount === ''
      || this.state.terminateSelection === 0) {
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
        monthlyRequiredAmount: calculatedMonthlyRequired,
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
      monthlyRequiredAmount: this.state.monthlyRequiredAmount,
      projection: this.state.projection,
      difference: this.state.difference,
      contributableAmount: this.state.contributableAmount,
      startingCash: this.state.startingCash
    });
  }
  render() {
    const calculateWord = this.state.calculated ? "Re-c" : "C"
    const monthlyRequiredAmount = numeral(this.state.monthlyRequiredAmount).format('$0,0.00');
    const projection = numeral(this.state.projection).format('$0,0.00');
    const difference = numeral(Math.abs(this.state.difference)).format('$0,0.00');
    const monthlyDifference = numeral(Math.abs(this.state.difference / this.state.duration)).format('$0,0.00');
    return (
      <div className="content-container">
        {this.state.error && <p>{this.state.error}</p>}
        <form
          className="form"
          onSubmit={this.onCalculate}>
          <label htmlFor="target">Goal</label>
          <CreatableSelect
            isClearable
            options={this.props.emergencyFund}
            value={this.selectedOption}
            placeholder="Pick a goal type"
            onChange={this.handlePickerChange} />
          {this.state.name === ''
            ? ''
            :
            <input
              className="text-input"
              placeholder="How much would you like to save?"
              value={this.state.target}
              onChange={this.onAmountChange}
              id="target" />}
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
          <label htmlFor="terminateDate">I want to finish by...</label>
          <CreatableSelect
            isClearable
            options={this.state.terminateOptions}
            value={this.selectedOption}
            placeholder="When do you want to finish your goal?"
            onChange={this.handlePickerChange}
            id="terminateDate" />
          <div>
            <button
              disabled={!this.state.changed}
              className="button">{calculateWord}alculate Goal</button>
          </div>
        </form>
        {/* Change this here down to a Goal Summary */}
        {
          this.state.calculated && this.state.terminateSelection === 4
            ? <div>
              <h2>Here's a summary of your goal:</h2>
              <p>Minimum required savings: {monthlyRequiredAmount} per month</p>
              <p>End of year total: {projection}</p>
              {this.state.willMakeGoal
                ? <p>You'll make your goal, and beat your goal by {difference}.</p>
                : <p>You won't make your goal. You're {difference} short. Add {monthlyDifference} per month.</p>}
            </div>
            : ''
        }
        {
          this.state.calculated && this.state.terminateSelection === 5
            ? <div>
              <h2>Here's a summary of your goal:</h2>
              <p>Monthly savings: {this.state.contributableAmount} per month</p>
              <p>End of year total: {projection}</p>
              <p>Months to reach goal: {this.state.timeToHitGoal}</p>
            </div>
            : ''
        }
        <button className="button"
          disabled={!this.state.calculated}
          onClick={this.saveGoals}>Save Goal</button>
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
