import React from 'react';
import GoalsForm from './GoalsForm';
import GoalSummary from './GoalSummary';
import { connect } from 'react-redux';
import { startAddGoal } from '../actions/goal';
import { FormHeader } from './FormHeader';
import summarySelector from '../selectors/summarySelector';

export class AddGoalsPage extends React.Component {
  onSaveGoal = (goal) => {
    this.props.startAddGoal(goal);
    this.props.history.push('/');
  }
  render() {
    return (
      <div className="content-container--main fadein">
        <div className="content-container--card shadow">
          <FormHeader
            formType={'goals'} />
          <GoalsForm
            onSaveGoal={this.onSaveGoal}
            goal={this.props.goal} />
        </div>
        <div className="content-container shadow">
          <div className="content-container">
            {
              this.props.goal
                ? this.props.goal.map((go) => {
                  return <GoalSummary
                    {...go} key={go.id} summary={this.props.summary} />
                })
                : ''
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  goal: state.goal,
  summary: summarySelector(state.income, state.expense, state.goal)
})

const mapDispatchToProps = (dispatch) => ({
  startAddGoal: (goal) => dispatch(startAddGoal(goal))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddGoalsPage)
