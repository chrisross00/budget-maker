import React from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'react-collapse';

import GoalListItem from './GoalListItem';
import formatInUsd from '../helpers/formatInUsd';
import summarySelector from '../selectors/summarySelector';

export class GoalList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false
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
      <div className="shadow">
        <div className={!this.state.isOpened ? "list-header__clickable" : "list-header__clickable clicked"}
          onClick={this.onClickHandler}>
          <h3 className="list-header-title">Monthly Goals</h3>
          <h3 className="list-header-title">{formatInUsd(this.props.summary.totalGoalContribution)}</h3>
        </div>
        <Collapse
          isOpened={this.state.isOpened}>
          <div className="list-body">
            {this.props.goals.length === 0
              ? <div>
                <div className="list-header">Your Goals</div>
                <div className="list-item list-item-message">
                  <span>No goals added yet</span>
                </div>

              </div>
              : this.props.goals.map((goal) => {
                return <GoalListItem {...goal} key={goal.id} />
              })}
          </div>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  goals: state.goal,
  summary: summarySelector(state.income, state.expense, state.goal)
});

export default connect(mapStateToProps)(GoalList)
