import React from 'react';
import { connect } from 'react-redux';
import IncomeListItem from './IncomeListItem';

const IncomeList = (props) => (
  <div>
    <h3>IncomeList</h3>
    <div>{props.income.length === 0
      ? "No income added yet"
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
