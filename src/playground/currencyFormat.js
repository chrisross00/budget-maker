import React from 'react';
import CurrencyFormat from 'react-currency-format';

export class FormThing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stuff: ''
    }
  }
  onValueChange = (values) => {
    const { formattedValue, value } = values;
    this.setState({ formattedValue: formattedValue })
    console.log(formattedValue);
    console.log(value);
  }

  render() {
    return (
      <div>
        <CurrencyFormat
          className="text-input"
          thousandSeparator={true}
          prefix={'$'}
          onValueChange={this.onValueChange} />
      </div>
    )
  }
}

export default FormThing;
