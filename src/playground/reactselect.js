import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
    }
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={this.state.selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}
export default App
