import React from 'react';
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
    switch (selection.value) {
      case 'Income':
        return this.setState({
          selectedScenario: selection,
          modificationOptions: [{ value: 'income', 'label': 'income' }]
        });
      case 'Expenses':
        return this.setState({
          selectedScenario: selection,
          modificationOptions: [{ value: 'expenses', 'label': 'expenses' }]
        })
      case 'Goals':
        return this.setState({
          selectedScenario: selection,
          modificationOptions: [{ value: 'goals', 'label': 'goals' }]
        })
    }
  }
  render() {
    return (

      <div>
        <div className="picker">
          <CreatableSelect
            isClearable
            options={this.state.scenarioTypes}
            onChange={this.onScenarioSelection}
            value={this.state.selectedScenario}
            placeholder="What do you want to change?" />
        </div>

        <div className="picker">
          <CreatableSelect
            isClearable
            options={this.state.modificationOptions}
            onChange={this.onScenarioSelection}
            value={this.state.selectedModificationOption}
            placeholder="Select an option" />
        </div>

        {/* <div className="picker">
          <CreatableSelect
            isClearable
            className="text"
            options={this.props.expenseCategory}
            value={this.state.selectedOption}
            onChange={this.onExpenseSelection}
            placeholder="Pick an expense" />
        </div> */}

      </div>
    )
  }
}

export default ScenarioForm;
