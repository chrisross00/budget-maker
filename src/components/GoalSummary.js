import React from 'react';
// deprecated for now
const GoalSummary = ({
  amount,
  projection,
  difference,
  monthlyDifference,
  contributableAmount,
  timeToHitGoal,
  terminateSelection
}) => (
    <div>
      {terminateSelection
        ? <div>
          <h2>Here's a summary of your goal:</h2>
          <p>Monthly savings: {contributableAmount} per month</p>
          <p>End of year total: {projection}</p>
          <p>Months to reach goal: {timeToHitGoal}</p>
        </div>
        : <div>
          <h2>Here's a summary of your goal:</h2>
          <p>Minimum required savings: {amount} per month</p>
          <p>End of year total: {projection}</p>
          {this.state.willMakeGoal
            ? <p>You'll make your goal, and beat your goal by {difference}.</p>
            : <p>You won't make your goal. You're {difference} short. Add {monthlyDifference} per month.</p>}
        </div>
      }
    </div>
  );

export default GoalSummary
