import React from 'react';
const GoalListItem = ({
  name,
  target,
  amount,
  projection,
  contributableAmount,
  startingCash }
) => (
    <div>
      <h3>{`Goal Name: ${name}`}</h3>
      <p>{`Target: ${target}`}</p>
      <p>{`Amount saved per month: ${contributableAmount}`}</p>
      <p>{`Minimum monthly savings: ${amount}`}</p>
      <p>{`Current cash: ${startingCash}`}</p>
      <p>{`End of year Balance: ${projection}`}</p>
    </div>
  );

export default GoalListItem



// const amount = numeral(this.state.amount).format('$0,0.00');
