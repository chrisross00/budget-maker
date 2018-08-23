import React from 'react';


export class FormHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: this.props.formType ? this.props.formType : ''
    }
  }
  render() {
    const headerContent = ({
      income: {
        title: "Enter your income",
        subtitle: "Let's figure out your monthly income.",
        subtitle2: "Tell us about your paycheck and we do the rest"
      },
      expenses: {
        title: "Enter your monthly expenses",
        subtitle: "Rent, groceries, bills... The lame stuff.",
        subtitle2: "Let's figure out your monthly bills"
      },
      goals: {
        title: "Enter your goals",
        subtitle: "Pick a goal and start saving your Monthly Cash.",
        subtitle2: "(You can skip this step if you'd rather do this later.)"
      },
      whatIf: {
        title: "What If?",
        subtitle: "What if rent increases? What if you get a new job?",
        subtitle2: "Use this to predict the future."
      }
    });
    return (
      <div className="form-header">
        <h1 className="form-header__title">{headerContent[this.state.formType].title}</h1>
        <div className="form-header__subtitle">
          <p>{headerContent[this.state.formType].subtitle}</p>
          <p>{headerContent[this.state.formType].subtitle2}</p>
        </div>
        <hr />
      </div>
    )
  }
}

export default FormHeader;
