import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import ExpenseListItem from './ExpenseListItem';
import totalSelector from '../selectors/total-selector';
import biggestItemSelector from '../selectors/biggestItemSelector';


class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thing: '',
      netWorth: 0,
      totalMonthlyIncome: 0,
      totalCostOfLiving: 0,
      totalGoalContribution: 0,
      totalCash: 0
    }
  }
  onCalculate = (e) => {
    e.preventDefault();
    const startingCash = this.props.goals.map((goal) => goal.startingCash)
    const goalContribution = this.props.goals.map((goal) => goal.target)
    const totalCash = parseFloat(this.props.incomeTotal) - parseFloat(this.props.expenseTotal) - parseFloat(this.props.goalTotal)

    this.setState(() => ({
      netWorth: parseFloat(this.props.incomeTotal) + parseFloat(startingCash),
      totalMonthlyIncome: parseFloat(this.props.incomeTotal),
      totalGoalContribution: goalContribution,
      totalCash: totalCash
      // largestFixedCost: ,
      // largestFixedCostAmount: ,
      // largestFixedCostPercent:
    }))
  }
  render() {
    return (
      <div className="content-contained">
        {this.props.goals.length === 0
          ? ''
          :
          <div>
            <h2>Summary</h2>
            <button className="button"
              onClick={this.onCalculate}>Calculate Budget Summary</button>
            <div>
              <h3>Overview:</h3>
              <p>Total Monthly Income: {numeral(this.props.incomeTotal).format('$0,0.00')}</p>
              <p>Net Worth: {numeral(this.state.netWorth).format('$0,0.00')}</p>
              <p>Total Cost of Living: {numeral(this.props.expenseTotal).format('$0,0.00')}</p>
              <p>Total Goal Contribution: {numeral(this.props.goalTotal).format('$0,0.00')}</p>
              <p>Total Cash: {numeral(this.props.totalCash).format('$0,0.00')}</p>
            </div>
            <div>
              <h3>Cash:</h3>
              <p>Total Cash: {numeral(this.state.totalCash).format('$0,0.00')}</p>
              <p><span>Cash as a % of Income: </span>
                {
                  this.props.incomeTotal
                    ? Math.round((parseFloat(this.state.totalCash) / parseFloat(this.props.incomeTotal)) * 100)
                    : ' 0.00'
                }
                %
              </p>
            </div>
            <div>
              <h3>Expenses:</h3>
              <p>Total Expenses:  {numeral(this.props.expenseTotal).format('$0,0.00')}</p>
              <p>Total Fixed Expenses: </p>
              <p>Total Variable Costs: </p>
              <h4>Largest Fixed Cost: </h4>
              <p>Category: {this.props.biggestItems[0].expenseCategory}</p>
              <p>Amount: {numeral(this.props.biggestItems[0].amount).format('$0,0.00')}</p>
              <p>Amount as % of Total Cost of Living: {Math.round(parseFloat(this.props.biggestItems[0].amount) / parseFloat(this.props.expenseTotal) * 100)}%</p>
            </div>
            <div>
              <h3>Goals:</h3>
            </div>

          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    income: state.income,
    goals: state.goal,
    emergencyFund: state.emergencyFund,
    expenses: state.expense,
    expenseTotal: totalSelector(state.expense),
    incomeTotal: totalSelector(state.income, 2),
    goalTotal: totalSelector(state.goal),
    biggestItems: biggestItemSelector(state.expense)
  }
};


export default connect(mapStateToProps)(Summary);
