import React from 'react';
import { connect } from 'react-redux';
import { addIncome } from '../actions/income';
import { addGoal } from '../actions/goal';
import { updateProgress } from '../actions/progress';
import ExpenseList from './ExpenseList';
import GoalsForm from './GoalsForm';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';
import Progress from './Progress';

// Want to fade in each component - probably want to use React lifecycle
// unmount, will receive props, etc
// https://medium.com/@joethedave/achieving-ui-animations-with-react-the-right-way-562fa8a91935

export class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIncome: true,
      showExpense: false,
      showGoals: false,
      step: 1,
      animate: false
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
  render() {
    console.log(this.props.isAuthenticated);
    return (
      <div>
        <Progress />
        {
          this.state.showIncome
            ?
            <div className="content-container--card shadow fadein">
              <div className="content-container">
                <div className="form-header">
                  <h1 className="form-header__title">Enter your income</h1>
                  <hr />
                </div>
              </div>
              <IncomeForm
                onSubmit={this.onSubmitIncome} />
            </div>
            : ''
        }
        {
          this.state.showExpense
            ?
            <div className="content-container--card shadow fadein">
              <div className="content-container">
                <div className="form-header">
                  <h1 className="form-header__title">Enter your expenses</h1>
                  <hr />
                </div>
              </div>
              <ExpenseForm
                onComplete={this.onSaveExpenses} />
              <div className="content-container">
                <hr />
                <ExpenseList {...this.props.expenses} />
              </div>
            </div>
            : ''
        }
        {
          this.state.showGoals
            ?
            <div>
              <div className="content-container--card shadow fadein">
                <div className="content-container">
                  <div className="form-header">
                    <h1 className="form-header__title">Enter your goals</h1>
                    <hr />
                  </div>
                </div>
                <GoalsForm
                  onSaveGoal={this.onSaveGoal} />
              </div>
            </div>
            : ''
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isDoneWithSetup: !!state.progress[state.progress.length - 1].complete,
  isAuthenticated: !!state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
  addIncome: (income) => dispatch(addIncome(income)),
  addGoal: (goal) => { dispatch(addGoal(goal)) },
  updateProgress: (progressId, updates) => { dispatch(updateProgress(progressId, updates)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Setup)
