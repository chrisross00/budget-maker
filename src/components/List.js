import React from 'react';
import { Collapse } from 'react-collapse';
import { connect } from 'react-redux';
import { FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ListItem from './ListItem';

import formatInUsd from '../helpers/formatInUsd';
import summarySelector from '../selectors/summarySelector';

export class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: this.props.isOpened ? this.props.isOpened : false,
      parent: this.props.parent ? this.props.parent : '',
      propToRender: '',
      summaryToRender: '',
      wordToRender: ''
    }
  }
  onClickHandler = () => {
    this.setState({
      isOpened: !this.state.isOpened
    });
  }
  componentDidMount = () => {
    if (this.state.parent === 'expenses') {
      this.setState({
        propToRender: this.props.expense,
        summaryToRender: formatInUsd(this.props.summary.totalCostOfLiving),
        wordToRender: 'Expenses'
      })
    } else if (this.state.parent === 'income') {
      this.setState({
        propToRender: this.props.income,
        summaryToRender: formatInUsd(this.props.summary.totalMonthlyIncome),
        wordToRender: 'Income'
      })
    } else if (this.state.parent === 'goals') {
      this.setState({
        propToRender: this.props.goal,
        summaryToRender: formatInUsd(this.props.summary.totalGoalContribution),
        wordToRender: 'Goals'
      })
    }
  }

  render() {
    console.log(this.state.propToRender);
    return (
      <div className="shadow">
        <div className={!this.state.isOpened ? "list-header__clickable" : "list-header__clickable clicked"}
          onClick={this.onClickHandler}>
          <h3 className="list-header-title">Monthly {this.state.wordToRender}</h3>
          <h3 className="list-header-title">{this.state.summaryToRender}</h3>
        </div>
        <Collapse
          isOpened={this.state.isOpened}>
          <div>{this.state.propToRender.length === 0
            ? <div className="list-item list-item-message">
              <span>No {this.state.wordToRender.toLowerCase()} added yet</span>
            </div>
            : this.state.propToRender.map((item) => {
              return <ListItem {...item} key={item.id} />
            })
          }
          </div>
          <div className="list-item">
            <div>
              <span className="list-item__subtitle">
                <span>
                  Add another
                </span>
              </span>
            </div>
            <div>
              <Link to={this.state.parent}>
                <FaPlusCircle />
              </Link>
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expense: state.expense,
  goal: state.goal,
  income: state.income,
  summary: summarySelector(state.income, state.expense, state.goal)
});

export default connect(mapStateToProps)(List)
