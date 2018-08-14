import React from 'react';
import numeral from 'numeral';
import formatInUsd from '../helpers/formatInUsd';

const GoalListItem = ({
  name,
  target,
  amount,
  projection,
  contributableAmount,
  savings }
) => (
    <div>
      <div className="list-header">
        <div className="show-for-desktop">{`Goal: ${name}`}</div>
        <div className="show-for-mobile">{`Goal: ${name}`}</div>
        <div className="show-for-desktop">{formatInUsd(contributableAmount)}</div>
      </div>
      <div className="list-item">Target
        <span className="list-item__data">
          {formatInUsd(target)}
        </span>
      </div>
      <div className="list-item">Amount saved per month
        <span className="list-item__data">
          {formatInUsd(contributableAmount)}
        </span>
      </div>
      <div className="list-item">Minimum monthly savings
        <span className="list-item__data">
          {formatInUsd(amount)}
        </span>
      </div>
      <div className="list-item">Current cash
        <span className="list-item__data">
          {formatInUsd(savings)}
        </span>
      </div>
      <div className="list-item">End of year Balance
        <span className="list-item__data">
          {formatInUsd(projection)}
        </span>
      </div>
    </div>
  );

export default GoalListItem
