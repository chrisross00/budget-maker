import React from 'react';
import { connect } from 'react-redux';
import GoalListItem from './GoalListItem';

const GoalList = ({ goals }) => (
  <div className="list-body">
    <h3>Here's your goals</h3>
    {goals.length === 0
      ? <p>No goals added yet</p>
      : goals.map((goal) => {
        return <GoalListItem {...goal} key={goal.id} />
      })}
  </div>
);

const mapStateToProps = (state) => ({
  goals: state.goal
});

export default connect(mapStateToProps)(GoalList)
