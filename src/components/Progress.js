import React from 'react';
import { connect } from 'react-redux';

export class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'is-active'
    };
  }

  render() {
    return (
      <div className="content-container--card__title shadow--light" >
        <div className="content-container--subcontainer">
          {
            this.props.progress.map((step) => {
              return <h3
                key={step.progressId}
                className={step.inProgress
                  ? 'is-active'
                  : 'is-active-false'}>{step.progressId}. {step.subtitle}</h3>
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  progress: state.progress
})


export default connect(mapStateToProps)(Progress)
