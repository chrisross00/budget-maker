import React from 'react';
import numeral from 'numeral';

const GoalListItem = ({
  name,
  target,
  amount,
  projection,
  contributableAmount,
  startingCash }
) => (
    <div>
      <div className="list-header">
        <div className="show-for-desktop">{`Goal Name: ${name}`}</div>
        <div className="show-for-mobile">{`Goal Name: ${name}`}</div>
        <div className="show-for-desktop">Amount</div>
      </div>
      <div className="list-item">Target
        <span className="list-item__data">
          {numeral((target)).format('$0,0.00')}
        </span>
      </div>
      <div className="list-item">Amount saved per month
        <span className="list-item__data">
          {numeral((contributableAmount)).format('$0,0.00')}
        </span>
      </div>
      <div className="list-item">Minimum monthly savings
        <span className="list-item__data">
          {numeral((amount)).format('$0,0.00')}
        </span>
      </div>
      <div className="list-item">Current cash
        <span className="list-item__data">
          {numeral((startingCash)).format('$0,0.00')}
        </span>
      </div>
      <div className="list-item">End of year Balance
        <span className="list-item__data">
          {numeral((projection)).format('$0,0.00')}
        </span>
      </div>
    </div>
  );

export default GoalListItem



// const amount = numeral(this.state.amount).format('$0,0.00');
