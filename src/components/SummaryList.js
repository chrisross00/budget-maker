import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import biggestItemSelector from '../selectors/biggestItemSelector';
import formatInUsd from '../helpers/formatInUsd'
import summarySelector from '../selectors/summarySelector';
import totalSelector from '../selectors/total-selector';

class Summary extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="content-container">
        <Link
          className="form-header__title"
          to="/whatif">
          <h1>What If Scenarios</h1>
        </Link>
        <h2>Details</h2>
        {this.props.goals.length === 0
          ? ''
          :
          <div>
            <div>
              <div className="content-container--card shadow">
                <div className="content-container">
                  <div className="form-header">
                    <h1 className="form-header__title">Overview</h1>
                    <hr />
                  </div>
                  <div className="content">
                    <p>Total Monthly Income: {formatInUsd(this.props.summary.totalMonthlyIncome)}</p>
                    <p>Net Worth: {formatInUsd(this.props.summary.netWorth)}</p>
                    <p>Total Cost of Living: {formatInUsd(this.props.summary.totalCostOfLiving)} </p>
                    <p>Total Goal Contribution: {formatInUsd(this.props.summary.totalGoalContribution)}</p>
                    <p>Total Cash: {formatInUsd(this.props.summary.totalCash)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="content-container--card shadow">
                <div className="content-container">
                  <div className="form-header">
                    <h1 className="form-header__title">Cash</h1>
                    <hr />
                  </div>
                  <div className="content">
                    <p>Total Cash: {formatInUsd(this.props.summary.totalCash)}</p>
                    <p>Cash as a % of Income: {formatInUsd(this.props.summary.cashAsPercent)}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="content-container--card shadow">
                <div className="content-container">
                  <div className="form-header">
                    <h1 className="form-header__title">Expenses</h1>
                    <hr />
                  </div>
                  <div className="content">
                    <p>Total Expenses:  {formatInUsd(this.props.expenseTotal)}</p>
                    <p>Total Fixed Expenses: {formatInUsd(this.props.summary.totalCostOfLiving)}</p>
                    <p>Total Variable Costs: </p>
                    <div>
                      <span>
                        Largest Fixed Cost:
                        {this.props.biggestItems.map((items) => {
                          return (
                            <span key={items.expenseCategoryId}>
                              <span>
                                {` ${items.expenseCategory}; 
                                ${formatInUsd(items.amount)}
                                ${Math.round(((items.amount) / (this.props.summary.totalCostOfLiving)) * 100)}%
                                `
                                }
                              </span>
                            </span>)
                        }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div>
              <div className="content-container--card shadow">
                <div className="content-container">
                  <div className="form-header">
                    <h1 className="form-header__title">Goals</h1>
                    <hr />
                  </div>
                  <div className="content">
                  </div>
                </div>
              </div>
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
