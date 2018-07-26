import React from 'react';
import { connect } from 'react-redux';
import IncomeListItem from './IncomeListItem';

const IncomeList = (props) => (
  <div>
    <h2>IncomeList</h2>
    <div>{props.income.length === 0
      ? "No income added yet"
      : props.income.map((income) => {
        return <IncomeListItem {...income} key={income.id} />
      })}
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  income: state.income
});

export default connect(mapStateToProps)(IncomeList);

// export default connect(mapStateToProps)(IncomeList);
