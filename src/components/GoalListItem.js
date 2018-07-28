import React from 'react';
const GoalListItem = ({
  name,
  target,
  monthlyRequiredAmount,
  projection,
  contributableAmount,
  startingCash }
) => (
    <div>
      <h3>{`Goal Name: ${name}`}</h3>
      <p>{`Target: ${target}`}</p>
      <p>{`Amount saved per month: ${contributableAmount}`}</p>
      <p>{`Minimum monthly savings: ${monthlyRequiredAmount}`}</p>
      <p>{`Current cash: ${startingCash}`}</p>
      <p>{`End of year Balance: ${projection}`}</p>
    </div>
  );

export default GoalListItem



// const monthlyRequiredAmount = numeral(this.state.monthlyRequiredAmount).format('$0,0.00');
