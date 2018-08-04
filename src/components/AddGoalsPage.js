import React from 'react';
import GoalsForm from './GoalsForm';
import { connect } from 'react-redux';
import { addGoal } from '../actions/goal';

export class AddGoalsPage extends React.Component {
  onSaveGoal = (goal) => {
    this.props.addGoal(goal);
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add your goals</h1>
          </div>
        </div>
        <GoalsForm
          onSaveGoal={this.onSaveGoal} />
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  addGoal: (goal) => { dispatch(addGoal(goal)) }
})

export default connect(undefined, mapDispatchToProps)(AddGoalsPage)
