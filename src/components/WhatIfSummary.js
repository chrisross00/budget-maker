import React from 'react';
import { connect } from 'react-redux';
import formatInUsd from '../helpers/formatInUsd'
import summarySelector from '../selectors/summarySelector';
import totalSelector from '../selectors/total-selector';
import ListItem from './ListItem';

export const whatIfSummary = (props) => (
  <div className="shadow--light" >
    <div className="content-container--stickyheader fadein">
      <p>Current Leftover Cash <br />
        {formatInUsd(props.summary.totalCash)}</p>
      <div>
        <p>
          Changes <br />
          {
            props.whatIfSummary.totalCash - props.summary.totalCash === 0
              ?
              "$0.00"
              :
              <span>
                {
                  props.whatIfSummary.totalCash > props.summary.totalCash
                    ? <span className="positive">+ {formatInUsd(props.whatIfSummary.totalCash - props.summary.totalCash)}</span>
                    : <span className="negative">- {formatInUsd(props.summary.totalCash - props.whatIfSummary.totalCash)}</span>
                }
              </span>
          }
        </p>
      </div>

      <p >What If Leftover Cash<br />
        {formatInUsd(props.whatIfSummary.totalCash)}</p>
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    income: state.income,
    expenses: state.expense,
    goals: state.goal,
    expenseTotal: totalSelector(state.expense),
    incomeTotal: totalSelector(state.income, 2),
    goalTotal: totalSelector(state.goal),
    whatIfIncomeTotal: totalSelector(state.whatIfIncome, 2),
    whatIfExpenseTotal: totalSelector(state.whatIfExpense),
    whatIfGoalTotal: totalSelector(state.whatIfGoal),
    summary: summarySelector(state.income, state.expense, state.goal),
    whatIfSummary: summarySelector(state.whatIfIncome, state.whatIfExpense, state.whatIfGoal),
    whatIfs: state.whatIfs
  }
}

export default connect(mapStateToProps)(whatIfSummary)
