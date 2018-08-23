import React from 'react';
import { connect } from 'react-redux';

import { addIncome } from '../actions/income';
import { addGoal } from '../actions/goal';
import { updateProgress } from '../actions/progress';
import { addExpense } from '../actions/expense';

import formatInUsd from '../helpers/formatInUsd'
import FormHeader from './FormHeader'
import GoalsForm from './GoalsForm';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';
import Progress from './Progress';
import summarySelector from '../selectors/summarySelector';
import Card from './Card';

// Want to fade in each component - probably want to use React lifecycle
// unmount, will receive props, etc
// https://medium.com/@joethedave/achieving-ui-animations-with-react-the-right-way-562fa8a91935

// Eventually, use animations
// http://react-animations.herokuapp.com/

export class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIncome: true,
      showExpense: false,
      showGoals: false,
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
  onAddExpense = (expense) => {
    this.props.addExpense(expense);
  }
  render() {
    return (
      <div>
        <div className="content-container--sticky fadein">
          <Progress />
          <div className="content-container--card__title shadow--light">
            <div className="content-container--subcontainer">
              <h4>Monthly Income
                    <br />
                {formatInUsd(this.props.summary.totalMonthlyIncome)}
              </h4>
              <h4>—</h4>
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
            ? (<div className="content-container">
              <FormHeader
                formType={'income'} />
              <IncomeForm
                addIncome={this.onSubmitIncome}
                isOpened={true}
                income={this.props.income} />
            </div>)
            : ''
        }
        {
          this.state.showExpense
            ? (<div className="content-container">
              <ExpenseForm
                addExpense={this.onAddExpense}
                isOpened={true}
                expense={this.props.expense}
                onComplete={this.onSaveExpenses} />
            </div>
            )
            : ''
        }
        {
          this.state.showGoals ?
            (
              <div className="content-container">
                <GoalsForm onSaveGoal={this.onSaveGoal}
                  onSkipGoals={this.onSkipGoals} />
              </div>
            )
            : ''
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isDoneWithSetup: state.progress[state.progress.length - 1].complete,
  isAuthenticated: !!state.auth.uid,
  summary: summarySelector(state.income, state.expense, state.goal),
  income: state.income,
  expense: state.expense,
  goal: state.goal

})

const mapDispatchToProps = (dispatch) => ({
  addIncome: (income) => dispatch(addIncome(income)),
  addExpense: (expense) => dispatch(addExpense(expense)),
  addGoal: (goal) => { dispatch(addGoal(goal)) },
  updateProgress: (progressId, updates) => { dispatch(updateProgress(progressId, updates)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Setup)
