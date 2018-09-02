import React from 'react';

import { connect } from 'react-redux';
import summarySelector from '../selectors/summarySelector';
import formatInUsd from '../helpers/formatInUsd';

export const SummaryHeader = (props) => (
  <div className="shadow--light" >
    <div className="content-container--subcontainer">
      <p>Monthly Income
                    <br />
        {formatInUsd(props.summary.totalMonthlyIncome)}
      </p>
      <p>Monthly Expenses
                    <br />
        {
          props.summary.totalCostOfLiving > 0
            ? <span className="negative">- {formatInUsd(props.summary.totalCostOfLiving)}</span>
            : 0
        }
      </p>
      <p>Monthly Cash
                    <br />
        {formatInUsd(props.summary.totalCash)}
      </p>
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    summary: summarySelector(state.income, state.expense, state.goal)
  }
}

export default connect(mapStateToProps)(SummaryHeader)
