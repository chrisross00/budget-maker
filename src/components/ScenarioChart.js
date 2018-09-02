import React from 'react';
import {
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  DiscreteColorLegend,
  FlexibleXYPlot
} from 'react-vis';
import { connect } from 'react-redux'
import { resetWhatIfExpense, resetWhatIfGoal, resetWhatIfIncome, resetWhatIfs } from '../actions/whatIf';
import totalSelector from '../selectors/total-selector';
import summarySelector from '../selectors/summarySelector';

// API REFERENCE
//// https://uber.github.io/react-vis/documentation/api-reference/xy-plot

// CROSSHAIR REFERENCE
// // https://github.com/uber/react-vis/blob/master/showcase/axes/dynamic-crosshair.js

// TRANSPARENCY HEX
// // https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4

export class Chart extends React.Component {
  resetter = () => {
    this.props.resetWhatIfExpense(this.props.expenses);
    this.props.resetWhatIfIncome(this.props.income);
    this.props.resetWhatIfGoal(this.props.goals);
    this.props.resetWhatIfs();
  }
  onClickHandler = (e) => {
    this.resetter();
  }
  onHover = (value) => {
    // console.log(value.y - value.y0);
  }
  componentDidMount = () => {
    this.resetter();
  }
  render() {
    return (

      <div className="chart shadow"
        style={{
          height: '36.1rem'
        }}>
        <FlexibleXYPlot
          xType="ordinal"
          stackBy="y"
          margin={{ left: 50 }}>
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
              { x: 'Now', y: this.props.incomeTotal },
              // Income After
              { x: 'After', y: this.props.whatIfIncomeTotal }
            ]}
            stroke="#333" />

          {/* Total Expenses */}
          <VerticalBarSeries
            animation
            cluster="Total Expenses"
            color="#364051"
            data={[
              // Expense Before
              { x: 'Now', y: this.props.expenseTotal },
              // Expense After
              { x: 'After', y: this.props.whatIfExpenseTotal }
            ]}
            stroke="#333" />
          <VerticalBarSeries
            animation
            cluster="Total Expenses"
            color="#1c88bf"
            data={[
              // Goal Before
              { x: 'Now', y: this.props.goalTotal },
              // Goal After
              { x: 'After', y: this.props.whatIfGoalTotal }
            ]}
            stroke="#333" />
          <VerticalBarSeries
            animation
            cluster="Total Expenses"
            color="#A4f140"
            data={[
              // Leftover Before
              { x: 'Now', y: this.props.summary.totalCash >= 0 ? this.props.summary.totalCash : 0 },
              // Leftover After
              { x: 'After', y: this.props.whatIfSummary.totalCash >= 0 ? this.props.whatIfSummary.totalCash : 0 }
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
              { x: 'After', y: this.props.whatIfSummary.totalCash >= 0 ? 0 : this.props.whatIfSummary.totalCash }
            ]}
            stroke="#ff0000"
            onNearestXY={this.onHover} />

          {/* End total expenses */}
        </FlexibleXYPlot>
        <div className="button__container">
          <DiscreteColorLegend
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
          <button
            className="button"
            onClick={this.onClickHandler}>Reset</button>
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
  incomeTotal: totalSelector(state.income),
  goalTotal: totalSelector(state.goal),
  whatIfIncomeTotal: totalSelector(state.whatIfIncome),
  whatIfExpenseTotal: totalSelector(state.whatIfExpense),
  whatIfGoalTotal: totalSelector(state.whatIfGoal),
  summary: summarySelector(state.income, state.expense, state.goal),
  whatIfSummary: summarySelector(state.whatIfIncome, state.whatIfExpense, state.whatIfGoal),
  whatIfs: state.whatIfs
})

const mapDispatchToProps = (dispatch) => ({
  resetWhatIfExpense: (expense) => dispatch(resetWhatIfExpense(expense)),
  resetWhatIfGoal: (goal) => dispatch(resetWhatIfGoal(goal)),
  resetWhatIfIncome: (income) => dispatch(resetWhatIfIncome(income)),
  resetWhatIfs: () => dispatch(resetWhatIfs())
})

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
