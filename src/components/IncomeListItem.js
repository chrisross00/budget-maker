import React from 'react';

const IncomeListItem = ({ description, amount, frequencyType, incomeType }) => (
  <div>
    {description} - {amount} - {frequencyType} - {incomeType}
  </div>
);

export default IncomeListItem;
