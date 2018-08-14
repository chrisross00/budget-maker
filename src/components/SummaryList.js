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
    console.log('clicked');
    this.setState({
      isOpened: !this.state.isOpened
    });

  }
  render() {
    return (
      <div>
        <Link
          className="form-header__title"
          to="/whatif">
          <h2>What If Scenarios</h2>
        </Link>
        <h2>Budget Summary</h2>
        {this.props.goals.length === 0
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
                  <h3 className="list-header-title">Leftover Cash</h3>
                  <h3 className="list-header-title">{formatInUsd(this.props.summary.totalCash)}</h3>
                </div>
                <Collapse isOpened={this.state.isOpened}>
                  <div className="list-item">Biweekly cash
                  <span className="list-item__data">{formatInUsd(this.props.summary.totalCash / 2)}</span>
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
    incomeTotal: totalSelector(state.income, 2),
    goalTotal: totalSelector(state.goal),
    biggestItems: biggestItemSelector(state.expense),
    summary: summarySelector(state.income, state.expense, state.goal)
  }
};


export default connect(mapStateToProps)(Summary);
