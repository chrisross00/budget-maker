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
import IncomeForm from '../components/IncomeForm';
import CreatableSelect from 'react-select';



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

  onClickHandler = (e) => {
    // Enter data
    // Get temporary sum of expenses and goals
    // Use them to set state
    console.log(e);
    this.state.clicked
      ? //change
      this.setState({
        expenseTotal: this.state.expenseTotal * 2,
        goalTotal: this.state.goalTotal * 2,
        totalCash: this.state.incomeTotal - this.state.goalTotal * 2 - this.state.expenseTotal * 2,
        clicked: false
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
      { x: 'Now', y: this.props.summary.totalCash },
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
        <div className="content-container--card shadow">
          <div>
            <XYPlot
              className="clustered-stacked-bar-chart-example"
              xType="ordinal"
              stackBy="y"
              width={500}
              height={500}>
              <DiscreteColorLegend
                width={400}
                orientation="horizontal"
                items={[
                  {
                    title: 'Income',
                    color: '#f0f0f0'
                  },
                  {
                    title: 'Expenses',
                    color: '#364051'
                  },
                  {
                    title: 'Goals',
                    color: '#1c88bf'
                  },
                  {
                    title: 'Total Cash',
                    color: '#A4f140'
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
            <div className="button__container">
              <button
                className="button"
                onClick={this.onClickHandler}>Update Data</button>
            </div>
            <div className="content-container">
              <p></p>
              {this.state.error && <p className="form__error">{this.state.error}</p>}
            </div>
          </div>
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
