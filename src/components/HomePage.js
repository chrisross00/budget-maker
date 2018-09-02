import React from 'react';
import { connect } from 'react-redux'
import DashboardPage from './DashboardPage';
import Setup from './Setup';

export class HomePage extends React.Component {
  render() {
    const setupDone = this.props.progress
    switch (setupDone) {
      case true:
        return (
          <DashboardPage />
        )
      case false:
        return (
          <Setup />
        )
      default:
        return (
          <div><h1>Something went wrong!</h1></div>
        )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    progress: state.progress.setupDone
  }
}

export default connect(mapStateToProps)(HomePage)
