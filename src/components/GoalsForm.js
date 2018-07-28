import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

class GoalsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.goal ? this.props.goal.name : 'Savings Goal',
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
      willMakeGoal: false
    }
  }
  onAmountChange = (e) => {
    e.preventDefault();

    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ target: amount, changed: true }));
    }
  }
  onSavingsChange = (e) => {
    e.preventDefault();
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ startingCash: amount, changed: true }));
    }
  }
  onContributionChange = (e) => {
    e.preventDefault();
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ contributableAmount: amount, changed: true }));
    }
  }
  onCalculate = (e) => {
    e.preventDefault();
    if (this.state.target === ''
      || this.state.startingCash === ''
      || this.state.contributableAmount === '') {
      this.setState(() => ({
        error: 'Please fill out all required fields'
      }));
    } else if (this.state.startingCash >= this.state.target) {
      this.setState(() => ({
        error: 'You already beaten your goal — looks like you already have it in savings!'
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

      this.setState(() => ({
        calculated: true,
        changed: false,
        monthlyRequiredAmount: calculatedMonthlyRequired,
        projection: calculatedProjectedAmount,
        difference: calculatedDifferential,
        willMakeGoal: willMakeGoal,
        duration: dateDiff,
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
            onChange={this.onSavingsChange}
            id="savings" />
          <label htmlFor="contribution">Monthly payment</label>
          <input
            className="text-input"
            placeholder="How much can you save each month?"
            value={this.state.contributableAmount}
            onChange={this.onContributionChange}
            id="contribution" />
          <div>
            <button
              disabled={!this.state.changed}
              className="button">{calculateWord}alculate Goal</button>
          </div>
        </form>
        {
          this.state.calculated
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
        <button className="button"
          disabled={!this.state.calculated}
          onClick={this.saveGoals}>Save Goal</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  goals: state.goals
});

export default connect(mapStateToProps)(GoalsForm)
