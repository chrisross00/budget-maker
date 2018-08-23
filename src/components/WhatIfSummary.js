import React from 'react';
import { connect } from 'react-redux';
import formatInUsd from '../helpers/formatInUsd'
import summarySelector from '../selectors/summarySelector';
import totalSelector from '../selectors/total-selector';
import ListItem from './ListItem';

export const whatIfSummary = (props) => (
  <div className="content-container--subcontainer">
    <div className="content-container--subcontainer--item">
      <h3>Current <br /> Leftover Cash</h3>
      <h3>{formatInUsd(props.summary.totalCash)}</h3>
    </div>
    <div className="content-container--subcontainer--item">
      <h3 >What If <br /> Leftover Cash</h3>
      <h3 >{formatInUsd(props.whatIfSummary.totalCash)}</h3>
    </div>
    <div className="content-container--subcontainer--item">
      <span>
        <h3>Final <br /> Cash Difference</h3>
        {
          props.whatIfSummary.totalCash - props.summary.totalCash === 0
            ?
            <h4>
              $0.00
                  </h4>
            :
            <div>
              <h4>
                {
                  props.whatIfSummary.totalCash > props.summary.totalCash
                    ? <div>You'll have {formatInUsd(props.whatIfSummary.totalCash - props.summary.totalCash)} more cash</div>
                    : <div>You'll have {formatInUsd(props.summary.totalCash - props.whatIfSummary.totalCash)} less cash</div>
                }
              </h4>
            </div>
        }
      </span>
    </div>
    {/* <div>{props.whatIfs.length === 0
      ? <div>
        <span>Nothing added yet</span>
      </div>
      : props.whatIfs.map((item) => {
        return <ListItem {...item} key={item.id} />
      })
    }
    </div> */}
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
