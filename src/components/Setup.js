import React from 'react';
import { connect } from 'react-redux';
import { addIncome } from '../actions/income';
import { addGoal } from '../actions/goal';
import { updateProgress } from '../actions/progress';
import List from './List';
import formatInUsd from '../helpers/formatInUsd'
import GoalsForm from './GoalsForm';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';
import Progress from './Progress';
import summarySelector from '../selectors/summarySelector';

// Want to fade in each component - probably want to use React lifecycle
// unmount, will receive props, etc
// https://medium.com/@joethedave/achieving-ui-animations-with-react-the-right-way-562fa8a91935

export class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIncome: true,
      showExpense: true,
      showGoals: true,
      step: 1,
      animate: false,
    }
  }
  onSaveExpenses = () => {
    this.props.updateProgress(2, {
      complete: true,
      inProgress: false
    })
    this.setState({
      showExpense: false,
      showGoals: true
    })
    this.props.updateProgress(3, {
      complete: false,
      inProgress: true
    })
  }
  onSubmitIncome = (income) => {
    this.props.addIncome(income);
    this.props.updateProgress(1, {
      complete: true,
      inProgress: false
    })
    this.setState({
      showIncome: false,
      showExpense: true
    })
    this.props.updateProgress(2, {
      complete: false,
      inProgress: true
    })
  }
  onSaveGoal = (goal) => {
    this.props.addGoal(goal);
    this.props.updateProgress(3, {
      complete: true,
      inProgress: false
    })
    this.props.history.push('/');
  }
  onSkipGoals = () => {
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <div className="fadein">
          <Progress />
          <div className="content-container--card__title shadow--light" >
            <div className="content-container--subcontainer">
              <h4>Monthly Income
                    <br />
                {formatInUsd(this.props.summary.totalMonthlyIncome)}
              </h4>
              <h4>-</h4>
              <h4>Monthly Expenses
                    <br />
                {formatInUsd(this.props.summary.totalCostOfLiving)}
              </h4>
              <h4>=</h4>
              <h4>Monthly Cash
                    <br />
                {formatInUsd(this.props.summary.totalCash)}
              </h4>
            </div>
          </div>
        </div>
        {
          this.state.showIncome
            ? <IncomeForm onSubmit={this.onSubmitIncome} />
            : ''
        }
        {
          this.state.showExpense
            ? <ExpenseForm onComplete={this.onSaveExpenses} isOpened={true} />
            : ''
        }
        {
          this.state.showGoals ?
            <GoalsForm onSaveGoal={this.onSaveGoal}
              onSkipGoals={this.onSkipGoals} />
            : ''
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isDoneWithSetup: state.progress[state.progress.length - 1].complete,
  isAuthenticated: !!state.auth.uid,
  summary: summarySelector(state.income, state.expense, state.goal)

})

const mapDispatchToProps = (dispatch) => ({
  addIncome: (income) => dispatch(addIncome(income)),
  addGoal: (goal) => { dispatch(addGoal(goal)) },
  updateProgress: (progressId, updates) => { dispatch(updateProgress(progressId, updates)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Setup)
