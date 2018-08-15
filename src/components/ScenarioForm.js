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
  render() {
    return (
      <div><div className="content-container--card shadow fadein">
        <div className="content-container">
          <div className="form-header">

            <h1 className="form-header__title">What If?</h1>
            <div className="form-header__subtitle">
              <p>What if rent increases? What if you get a new job?</p>
              <p>Use this to predict the future.</p>
            </div>
            <hr />
          </div>
          <div className="picker">
            <CreatableSelect
              isClearable
              options={this.state.scenarioTypes}
              onChange={this.onScenarioSelection}
              value={this.state.selectedScenario}
              placeholder="What do you want to change?" />

            {/* Probably going to have to set up another reducer to manage whatIfs
Will then need to set the reducers up so actual reducers can be set off of whatIf reducer */}

          </div>
        </div>
      </div>
        <div>
          {
            this.state.selectedScenario.value
              ? this.state.selectedScenario.value === "Income"
                ? <IncomeForm />
                : this.state.selectedScenario.value === "Expenses"
                  ? <ExpenseForm />
                  : <GoalsForm />
              : ''
          }
        </div>
      </div>

    )
  }
}

export default ScenarioForm;
