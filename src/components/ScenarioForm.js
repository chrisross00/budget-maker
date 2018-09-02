import React from 'react';
import { connect } from 'react-redux';


import {
  addWhatIfGoal,
  addWhatIfIncome,
  updateWhatIfExpense,
  updateWhatIfIncome,
  addWhatIfExpense,
  storeWhatIf
} from '../actions/whatIf';
import ExpenseForm from './ExpenseForm';
import IncomeForm from './IncomeForm';
import GoalsForm from './GoalsForm';
import CreatableSelect from 'react-select';

export class ScenarioForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scenarioTypes: [{
        value: 'Income',
        label: 'Income'
      }, {
        value: 'Expenses',
        label: 'Expenses'
      }, {
        value: 'Goals',
        label: 'Goals'
      }],
      selectedScenario: '',
      modificationOptions: [],
      selectedModificationOption: ''
    }
  }
  onScenarioSelection = (selection) => {
    if (selection) {
      this.setState({
        selectedScenario: selection
      })
    }
    else {
      this.setState({
        selectedScenario: ''
      })
    }
  }
  clearScenarioSelection = () => {
    this.setState({
      selectedScenario: ''
    })
  }
  onAddWhatIfIncome = (whatIfIncome) => {
    this.props.addWhatIfIncome(whatIfIncome);
    this.props.storeWhatIf(whatIfIncome);
    this.clearScenarioSelection();
  }
  onUpdateWhatIfIncome = (id, whatIfIncome) => {
    this.props.updateWhatIfIncome(id, whatIfIncome);
    this.props.storeWhatIf(whatIfIncome);
    this.clearScenarioSelection();
  }
  onAddWhatIfExpense = (whatIfExpense) => {
    this.props.addWhatIfExpense(whatIfExpense);
    this.props.storeWhatIf(whatIfExpense);
    this.clearScenarioSelection();
  }
  onUpdateWhatIfExpense = (id, whatIfExpense) => {
    this.props.updateWhatIfExpense(id, whatIfExpense);
    this.props.storeWhatIf(whatIfExpense);
    this.clearScenarioSelection();
  }
  onAddWhatIfGoal = (whatIfGoal) => {
    this.props.addWhatIfGoal(whatIfGoal);
    this.props.storeWhatIf(whatIfGoal);
    this.clearScenarioSelection();
  }
  render() {
    return (
      <div>
        <div>
          <div className="picker">
            <CreatableSelect
              isClearable
              options={this.state.scenarioTypes}
              onChange={this.onScenarioSelection}
              value={this.state.selectedScenario}
              placeholder="What do you want to change?" />
          </div>
        </div>
        <br />
        {
          this.state.selectedScenario.value
            ? this.state.selectedScenario.value === "Income"
              ? <IncomeForm
                addIncome={this.onAddWhatIfIncome}
                updateIncome={this.onUpdateWhatIfIncome}
                income={this.props.whatIfIncome} />
              : this.state.selectedScenario.value === "Expenses"
                ? <ExpenseForm
                  addExpense={this.onAddWhatIfExpense}
                  updateExpense={this.onUpdateWhatIfExpense}
                  expense={this.props.whatIfExpense}
                  propsToRender={this.props.whatIfExpense} />
                : <GoalsForm
                  onSaveGoal={this.onAddWhatIfGoal}
                  goal={this.props.whatIfGoal} />
            : ''
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  whatIfExpense: state.whatIfExpense,
  whatIfIncome: state.whatIfIncome,
  whatIfGoal: state.whatIfGoal
})

const mapDispatchToProps = (dispatch) => ({
  addWhatIfGoal: (whatIfGoal) => dispatch(addWhatIfGoal(whatIfGoal)),
  addWhatIfExpense: (whatIfExpense) => dispatch(addWhatIfExpense(whatIfExpense)),
  addWhatIfIncome: (whatIfIncome) => dispatch(addWhatIfIncome(whatIfIncome)),
  updateWhatIfExpense: (id, whatIfExpense) => dispatch(updateWhatIfExpense(id, whatIfExpense)),
  updateWhatIfIncome: (id, whatIfIncome) => dispatch(updateWhatIfIncome(id, whatIfIncome)),
  storeWhatIf: (update) => dispatch(storeWhatIf(update))
});


export default connect(mapStateToProps, mapDispatchToProps)(ScenarioForm);
