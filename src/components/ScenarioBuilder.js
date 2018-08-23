import React from 'react';
import FormHeader from './FormHeader';
import ScenarioChart from './ScenarioChart';
import ScenarioForm from './ScenarioForm';
import WhatIfSummary from './WhatIfSummary';
import List from './List';
import { connect } from 'react-redux';

import formatInUsd from '../helpers/formatInUsd';
import summarySelector from '../selectors/summarySelector';

export const ScenarioBuilder = (props) => (
  <div>
    <div className="content-container--sticky shadow--light">
      <div className="content-container--subcontainer">
        <WhatIfSummary />
      </div>
    </div>
    <div className="fadein">
      <div className="content-container--whatif">
        <div className="content-container--card shadow">
          <div className="content-container">
            <FormHeader formType={"whatIf"} />
            <ScenarioForm />
          </div>
        </div>
        <ScenarioChart />
      </div>
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    expenses: state.whatIfExpense,
    goal: state.whatIfGoal,
    income: state.whatIfIncome,
    summary: summarySelector(state.whatIfIncome, state.whatIfExpense, state.whatIfGoal)
  }
}

export default connect(mapStateToProps)(ScenarioBuilder)
