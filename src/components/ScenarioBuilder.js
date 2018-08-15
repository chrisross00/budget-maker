import React from 'react';
import ScenarioChart from './ScenarioChart';
import ScenarioForm from './ScenarioForm';

export const ScenarioBuilder = () => (
  <div>
    <div className="content-container--scenario ">
      <ScenarioChart />
      <ScenarioForm />
    </div>
  </div>
)

export default ScenarioBuilder
