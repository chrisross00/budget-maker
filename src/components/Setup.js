import React from 'react';
import { connect } from 'react-redux';
import { addIncome } from '../actions/income';
import { addGoal } from '../actions/goal';
import ExpenseList from './ExpenseList';
import GoalsForm from './GoalsForm';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';

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
    }
  }
  onComplete = () => {
    this.setState({
      showExpense: false,
      showGoals: true
    })
  }
  onSubmitIncome = (income) => {
    this.props.addIncome(income);
    this.setState({
      showIncome: false,
      showExpense: true
    })
  }
  onSaveGoal = (goal) => {
    this.props.addGoal(goal);
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        {
          this.state.showIncome
            ?
            <div className="content-container--card shadow">
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
            <div className="content-container--card shadow">
              <div className="content-container">
                <div className="form-header">
                  <h1 className="form-header__title">Enter your expenses</h1>
                  <hr />
                </div>
              </div>
              <ExpenseForm
                onComplete={this.onComplete} />
              <div className="content-container">
                <ExpenseList {...this.props.expenses} />
              </div>
            </div>
            : ''
        }
        {
          this.state.showGoals
            ?
            <div>
              <div className="content-container--card shadow">
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

const mapDispatchToProps = (dispatch) => ({
  addIncome: (income) => dispatch(addIncome(income)),
  addGoal: (goal) => { dispatch(addGoal(goal)) }
});

export default connect(undefined, mapDispatchToProps)(Setup)
