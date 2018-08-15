// import React from 'react';
// import { Collapse } from 'react-collapse';
// import { connect } from 'react-redux';
// import { FaPlusCircle } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// import IncomeListItem from './IncomeListItem';
// import formatInUsd from '../helpers/formatInUsd';
// import summarySelector from '../selectors/summarySelector';

// export class IncomeList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isOpened: false
//     }
//   }
//   onClickHandler = () => {
//     console.log('clicked');
//     this.setState({
//       isOpened: !this.state.isOpened
//     });
//   }

//   render() {
//     return (
//       <div className="shadow">
//         <div className={!this.state.isOpened ? "list-header__clickable" : "list-header__clickable clicked"}
//           onClick={this.onClickHandler}>
//           <h3 className="list-header-title">Monthly Income</h3>
//           <h3 className="list-header-title">{formatInUsd(this.props.summary.totalMonthlyIncome)}</h3>
//         </div>
//         <Collapse
//           isOpened={this.state.isOpened}>
//           <div>{this.props.income.length === 0
//             ? <div className="list-item list-item-message">
//               <span>No income added yet</span>
//             </div>
//             : this.props.income.map((income) => {
//               return <IncomeListItem {...income} key={income.incomeId} />
//             })}
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
//               <Link to="income">
//                 <FaPlusCircle />
//               </Link>
//             </div>
//           </div>
//         </Collapse>
//       </div>
//     )
//   }
// };

// const mapStateToProps = (state) => ({
//   income: state.income,
//   summary: summarySelector(state.income, state.expense, state.goal)
// });

// export default connect(mapStateToProps)(IncomeList);
