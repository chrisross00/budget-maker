import React from 'react';
import SummaryList from './SummaryList';
import List from './List';
import { connect } from 'react-redux';

import formatInUsd from '../helpers/formatInUsd';
import summarySelector from '../selectors/summarySelector';

export class ExpenseDashboardPage extends React.Component {
  render() {
    return (
      <div className="content-container">
        <SummaryList />
        <List
          isOpened={false}
          parent={'Income'}
          propsToRender={this.props.income}
          summaryToRender={formatInUsd(this.props.summary.totalMonthlyIncome)}
          wordToRender={'Income'} />
        <List
          isOpened={false}
          parent={'Expenses'}
          propsToRender={this.props.expenses}
          summaryToRender={formatInUsd(this.props.summary.totalCostOfLiving)}
          wordToRender={'Expenses'} />
        <List
          isOpened={false}
          parent={'Goals'}
          propsToRender={this.props.goal}
          summaryToRender={formatInUsd(this.props.summary.totalGoalContribution)}
          wordToRender={'Goals'} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expense,
    goal: state.goal,
    income: state.income,
    summary: summarySelector(state.income, state.expense, state.goal)
  }
}

export default connect(mapStateToProps)(ExpenseDashboardPage)
