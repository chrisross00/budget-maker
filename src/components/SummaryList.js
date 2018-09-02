import React from 'react';
import { Collapse } from 'react-collapse';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import biggestItemSelector from '../selectors/biggestItemSelector';
import formatInUsd from '../helpers/formatInUsd'
import summarySelector from '../selectors/summarySelector';
import totalSelector from '../selectors/total-selector';

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: true,
      cashValue: this.props.summary.totalCash >= 0 ? "positive" : "negative"
    }
  }
  onClickHandler = () => {
    this.setState({
      isOpened: !this.state.isOpened
    });

  }
  render() {
    return (
      <div>
        <h2>Budget Summary</h2>
        {this.props.expenses.length === 0
          ? ''
          :
          <div>
            <div>
              <div className="shadow">
                <div className={
                  !this.state.isOpened
                    ? `list-header__clickable ${this.state.cashValue}`
                    : `list-header__clickable clicked ${this.state.cashValue}`}
                  onClick={this.onClickHandler}>
                  <h3 className="list-header-title">Leftover Cash (monthly)</h3>
                  <h3 className="list-header-title">{formatInUsd(this.props.summary.totalCash)}</h3>
                </div>
                <Collapse isOpened={this.state.isOpened}>
                  <div className="list-item"> {this.props.income.map((income) => {
                    return income.frequencyType
                  })}
                    <span className="list-item__data">{formatInUsd(this.props.summary.totalCash / 2)}</span>
                  </div>
                  <div className="list-item"> Biggest expense: {this.props.biggestItems[0].expenseCategory}
                    <span className="list-item__data"> {formatInUsd(this.props.biggestItems[0].amount)} </span>
                  </div>
                  <div className="list-item"> Total unspent cash (yearly)
                    <span className="list-item__data"> {formatInUsd(this.props.summary.totalCash * 12)} </span>
                  </div>
                  <div className="list-item"> Percent of income left unspent
                    <span className="list-item__data"> {Math.round(this.props.summary.cashAsPercent)}% </span>
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    income: state.income,
    goals: state.goal,
    emergencyFund: state.emergencyFund,
    expenses: state.expense,
    expenseTotal: totalSelector(state.expense),
    incomeTotal: totalSelector(state.income),
    goalTotal: totalSelector(state.goal),
    biggestItems: biggestItemSelector(state.expense),
    summary: summarySelector(state.income, state.expense, state.goal)
  }
};


export default connect(mapStateToProps)(Summary);
