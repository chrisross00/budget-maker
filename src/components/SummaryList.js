import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import totalSelector from '../selectors/total-selector';
import biggestItemSelector from '../selectors/biggestItemSelector';
import summarySelector from '../selectors/summarySelector';

class Summary extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="content-contained">
        {this.props.goals.length === 0
          ? ''
          :
          <div>
            <h2>Summary</h2>
            <div>
              <h3>Overview:</h3>
              <p>Total Monthly Income: {this.props.summary.totalMonthlyIncome}</p>
              <p>Net Worth: {this.props.summary.netWorth}</p>
              <p>Total Cost of Living: {this.props.summary.totalCostOfLiving}</p>
              <p>Total Goal Contribution: {this.props.summary.totalGoalContribution}</p>
              <p>Total Cash: {this.props.summary.totalCash}</p>
            </div>
            <div>
              <h3>Cash:</h3>
              <p>Total Cash: {this.props.summary.totalCash}</p>
              <p>Cash as a % of Income: {this.props.summary.cashAsPercent}%</p>
            </div>
            <div>
              <h3>Expenses:</h3>
              <p>Total Expenses:  {numeral(this.props.expenseTotal).format('$0,0.00')}</p>
              <p>Total Fixed Expenses: </p>
              <p>Total Variable Costs: </p>
              <h4>Largest Fixed Cost: </h4>
              {/* <p>Category: {this.props.biggestItems[0].expenseCategory}</p> */}
              {/* <p>Amount: {numeral(this.props.biggestItems[0].amount).format('$0,0.00')}</p>
              <p>Amount as % of Total Cost of Living: {Math.round(parseFloat(this.props.biggestItems[0].amount) / parseFloat(this.props.expenseTotal) * 100)}%</p> */}
            </div>
            <div>
              <h3>Goals:</h3>
            </div>
            <hr />
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
    biggestItems: biggestItemSelector(state.expense),
    summary: summarySelector(state.income, state.expense, state.goal)
  }
};


export default connect(mapStateToProps)(Summary);
