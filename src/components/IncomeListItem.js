import React from 'react';

const IncomeListItem = ({ description, amount, frequency, type }) => (
  <div>
    {description} - {amount} - {frequency} - {type}
  </div>
);

export default IncomeListItem;
