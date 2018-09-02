import React from 'react';
import FormHeader from './FormHeader';
import ScenarioChart from './ScenarioChart';
import ScenarioForm from './ScenarioForm';

export const ScenarioBuilder = () => (
  <div className="content-container--main">
    <div className="fadein">
      <div className="content-container--whatif">
        <div className="content-container--card shadow">
          <div className="content-container">
            <FormHeader formType={"whatIf"} />
            <ScenarioForm />
          </div>
        </div>
        <ScenarioChart />
      </div>
    </div>

  </div>
)

export default ScenarioBuilder;
