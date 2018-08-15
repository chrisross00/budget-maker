// import React from 'react';
// import { connect } from 'react-redux';
// import { Collapse } from 'react-collapse';
// import { FaPlusCircle } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// import ExpenseListItem from './ExpenseListItem';
// import formatInUsd from '../helpers/formatInUsd';
// import summarySelector from '../selectors/summarySelector';

// export class ExpenseList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isOpened: this.props.isOpened ? this.props.isOpened : false
//     }
//   }
//   onClickHandler = () => {
//     this.setState({
//       isOpened: !this.state.isOpened
//     });
//   }
//   render() {
//     return (
//       <div className="shadow">
//         <div className={!this.state.isOpened ? "list-header__clickable" : "list-header__clickable clicked"}
//           onClick={this.onClickHandler}>
//           <h3 className="list-header-title">Monthly Expenses</h3>
//           <h3 className="list-header-title">{formatInUsd(this.props.summary.totalCostOfLiving)}</h3>
//         </div>
//         <Collapse
//           isOpened={this.state.isOpened} >
//           <div>
//             {this.props.expense.length === 0
//               ? (
//                 <div className="list-item list-item-message">
//                   <span>No expenses added yet</span>
//                 </div>
//               )
//               : (this.props.expense.map((expense) => {
//                 return <ExpenseListItem {...expense} key={expense.id} />
//               }))}
//           </div>
//           <div className="list-item">
//             <div>
//               <span className="list-item__subtitle">
//                 <span>
//                   Add another
//                 </span>
//               </span>
//             </div>
//             <div>
//               <Link to="expenses">
//                 <FaPlusCircle />
//               </Link>
//             </div>
//           </div>
//         </Collapse>
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => ({
//   expense: state.expense,
//   summary: summarySelector(state.income, state.expense, state.goal)

// });

// export default connect(mapStateToProps)(ExpenseList)
