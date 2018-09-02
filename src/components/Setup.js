import React from 'react';
import { connect } from 'react-redux';

import { startAddIncome } from '../actions/income';
import { startAddGoal } from '../actions/goal';
import { startAddExpense } from '../actions/expense';
import { startUpdateProgress } from '../actions/progress';

import formatInUsd from '../helpers/formatInUsd'
import FormHeader from './FormHeader'
import GoalsForm from './GoalsForm';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';
import Progress from './Progress';
import summarySelector from '../selectors/summarySelector';
import Card from './Card';
import SummaryHeader from './SummaryHeader';

// Want to fade in each component - probably want to use React lifecycle
// unmount, will receive props, etc
// https://medium.com/@joethedave/achieving-ui-animations-with-react-the-right-way-562fa8a91935

// Eventually, use animations
// http://react-animations.herokuapp.com/

export class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIncome: this.props.progress ? this.props.progress.showIncome : true,
      showExpenses: this.props.progress ? this.props.progress.showExpenses : false,
      showGoals: this.props.progress ? this.props.progress.showGoals : false,
      step: 1,
      animate: false,
    }
  }

  onSaveExpenses = () => {
    this.props.startUpdateProgress({
      showIncome: false,
      showExpenses: false,
      showGoals: true,
      setupDone: false
    })
    this.setState({
      showExpenses: false,
      showGoals: true
    })
  }
  onSubmitIncome = (income) => {
    this.props.startAddIncome(income);
    this.props.startUpdateProgress({
      showIncome: false,
      showExpenses: true,
      showGoals: false,
      setupDone: false
    })
    this.setState({
      showIncome: false,
      showExpenses: true
    })
  }
  onSaveGoal = (goal) => {
    this.props.startAddGoal(goal);
    this.props.startUpdateProgress({
      showIncome: false,
      showExpenses: false,
      showGoals: false,
      setupDone: true
    })
  }
  onSkipGoals = () => {
    this.props.startUpdateProgress({
      showIncome: false,
      showExpenses: false,
      showGoals: false,
      setupDone: true
    });
  }
  onAddExpense = (expense) => {
    this.props.startAddExpense(expense);
  }
  render() {
    return (
      <div className="content-container--main fadein">
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
          this.state.showExpenses
            ? (<div className="content-container">
              <FormHeader
                formType={'expenses'} />
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
                <FormHeader
                  formType={'goals'} />
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
  progress: state.progress,
  isDoneWithSetup: state.progress.complete,
  isAuthenticated: !!state.auth.uid,
  summary: summarySelector(state.income, state.expense, state.goal),
  income: state.income,
  expense: state.expense,
  goal: state.goal

})

const mapDispatchToProps = (dispatch) => ({
  startAddIncome: (income) => dispatch(startAddIncome(income)),
  startAddExpense: (expense) => dispatch(startAddExpense(expense)),
  startAddGoal: (goal) => { dispatch(startAddGoal(goal)) },
  startUpdateProgress: (progressId, updates) => { dispatch(startUpdateProgress(progressId, updates)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Setup)
