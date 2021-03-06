import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  DiscreteColorLegend
} from 'react-vis';
import { connect } from 'react-redux'
import totalSelector from '../selectors/total-selector';
import summarySelector from '../selectors/summarySelector';


// API REFERENCE
//// https://uber.github.io/react-vis/documentation/api-reference/xy-plot

// CROSSHAIR REFERENCE
// // https://github.com/uber/react-vis/blob/master/showcase/axes/dynamic-crosshair.js

// TRANSPARENCY HEX
// // https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4

export class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incomeTotal: this.props.incomeTotal,
      expenseTotal: this.props.expenseTotal,
      goalTotal: this.props.goalTotal,
      totalCash: this.props.summary.totalCash,
      clicked: true,
      error: ''
    }
  }

  onClickHandler = () => {
    // Enter data
    // Get temporary sum of expenses and goals
    // Use them to set state

    this.state.clicked
      ? //change
      this.setState({
        expenseTotal: this.state.expenseTotal * 2,
        goalTotal: this.state.goalTotal * 2,
        clicked: false
      }, () => {
        this.setState({
          totalCash: this.state.incomeTotal - this.state.goalTotal - this.state.expenseTotal
        })
      })
      : //revert
      this.setState({
        expenseTotal: this.props.expenseTotal,
        goalTotal: this.props.goalTotal,
        totalCash: this.props.summary.totalCash,
        clicked: true
      })
  }
  onHover = (value) => {
    // console.log(value.y - value.y0);
  }
  render() {
    const preData = [
      { x: 'Now', y: this.props.incomeTotal },
      { x: 'Now', y: this.props.expenseTotal },
      { x: 'Now', y: this.props.goalTotal },
      { x: 'Now', y: (this.props.incomeTotal) - (this.props.expenseTotal) - (this.props.goalTotal) },
    ];
    const newDatas = [
      { x: 'After', y: this.state.incomeTotal },
      { x: 'After', y: this.state.expenseTotal },
      { x: 'After', y: this.state.goalTotal },
      {
        x: 'After',
        y: (this.state.totalCash) >= 0
          ? (this.state.totalCash)
          : 0
      },
      {
        x: 'After', y: (this.state.totalCash) >= 0
          ? 0
          : (this.state.totalCash)
      }
    ];
    return (

      <div>
        <div className="content-container--card">
          <XYPlot
            className="clustered-stacked-bar-chart-example"
            xType="ordinal"
            stackBy="y"
            width={500}
            height={500}>
            <DiscreteColorLegend
              orientation="horizontal"
              items={[
                {
                  title: 'Income',
                  color: '#f0f0f0'
                },
                {
                  title: 'Expenses',
                  color: '#444444'
                },
                {
                  title: 'Goals',
                  color: '#ffa500'
                }
              ]}
            />
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <VerticalBarSeries
              animation
              cluster="Income"
              color="#f7f7f7"
              data={[
                // Income Before
                preData[0],
                // Income After
                newDatas[0]
              ]}
              stroke="#333" />

            {/* Total Expenses */}
            <VerticalBarSeries
              animation
              cluster="Total Expenses"
              color="#364051"
              data={[
                // Expense Before
                preData[1],
                // Expense After
                newDatas[1]
              ]}
              stroke="#333" />
            <VerticalBarSeries
              animation
              cluster="Total Expenses"
              color="#1c88bf"
              data={[
                // Goal Before
                preData[2],
                // Goal After
                newDatas[2]
              ]}
              stroke="#333" />
            <VerticalBarSeries
              animation
              cluster="Total Expenses"
              color="#A4f140"
              data={[
                // Leftover Before
                preData[3],
                // Leftover After
                newDatas[3]
              ]}
              stroke="#333" />
            {/* End Total Expenses */}

            {/* Transparency when over */}
            <VerticalBarSeries
              animation
              cluster="Total Expenses"
              color="#66000000"
              data={[
                // Leftover After
                newDatas[4]
              ]}
              stroke="#ff0000"
              onNearestXY={this.onHover} />

            {/* End total expenses */}
          </XYPlot>
        </div>
        <div className="content-container">
          <button
            className="button__container"
            onClick={this.onClickHandler}>Update Data</button>

          {this.state.error && <p className="form__error">{this.state.error}</p>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  income: state.income,
  expenses: state.expense,
  goals: state.goal,
  expenseTotal: totalSelector(state.expense),
  incomeTotal: totalSelector(state.income, 2),
  goalTotal: totalSelector(state.goal),
  summary: summarySelector(state.income, state.expense, state.goal)
})

export default connect(mapStateToProps)(Chart);
