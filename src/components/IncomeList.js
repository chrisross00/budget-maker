import React from 'react';
import { connect } from 'react-redux';
import IncomeListItem from './IncomeListItem';

const IncomeList = (props) => (
  <div>
    <div className="list-header">
      <div className="show-for-desktop">Monthly Income</div>
      <div className="show-for-mobile">Monthly Income</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div>{props.income.length === 0
      ? <div className="list-item list-item-message">
        <span>No income added yet</span>
      </div>
      : props.income.map((income) => {
        return <IncomeListItem {...income} key={income.incomeId} />
      })}
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  income: state.income
});

export default connect(mapStateToProps)(IncomeList);

// export default connect(mapStateToProps)(IncomeList);
