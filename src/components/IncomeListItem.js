import React from 'react';
import numeral from 'numeral';

const IncomeListItem = ({ description, amount, frequencyType, incomeType }) => (
  <div className="list-item">
    <h4>
      {description}
    </h4>
    <span className="list-item__subtitle">
      {frequencyType} - {incomeType}
    </span>
    <span className="list-item__data">
      {numeral(amount).format('$0,0.00')}
    </span>
  </div>
);

export default IncomeListItem;
