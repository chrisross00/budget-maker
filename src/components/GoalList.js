import React from 'react';
import { connect } from 'react-redux';
import GoalListItem from './GoalListItem';

const GoalList = ({ goals }) => (
  <div className="list-body">
    {goals.length === 0
      ? <div>
        <div className="list-header">Your Goals</div>
        <div className="list-item list-item-message">
          <span>No goals added yet</span>
        </div>

      </div>
      : goals.map((goal) => {
        return <GoalListItem {...goal} key={goal.id} />
      })}
  </div>
);

const mapStateToProps = (state) => ({
  goals: state.goal
});

export default connect(mapStateToProps)(GoalList)
