import React from 'react';

export const GoalSummary = ({
  amount,
  projection,
  difference,
  monthlyDifference,
  contributableAmount,
  timeToHitGoal,
  terminateSelection,
  ...rest
}) => (
    <div>
      <div>
        <h2>Here's a summary of your goal:</h2>
        <p>Monthly savings: {amount}</p>
        <p>Current savings: {rest.savings}</p>
        <p>End of year total: {projection}</p>
        <p>Months to reach goal: {timeToHitGoal}</p>
      </div>
    </div>
  );

export default GoalSummary
