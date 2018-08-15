// import React from 'react';
// import { Collapse } from 'react-collapse';
// import { connect } from 'react-redux';
// import { FaPlusCircle } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// import GoalListItem from './GoalListItem';
// import formatInUsd from '../helpers/formatInUsd';
// import summarySelector from '../selectors/summarySelector';

// export class GoalList extends React.Component {
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
//           <h3 className="list-header-title">Monthly Goals</h3>
//           <h3 className="list-header-title">{formatInUsd(this.props.summary.totalGoalContribution)}</h3>
//         </div>
//         <Collapse
//           isOpened={this.state.isOpened}>
//           <div>{this.props.goals.length === 0
//             ? <div className="list-item list-item-message">
//               <span>No goals added yet</span>
//             </div>
//             : this.props.goals.map((goal) => {
//               return <GoalListItem {...goal} key={goal.id} />
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
//               <Link to="goals">
//                 <FaPlusCircle />
//               </Link>
//             </div>
//           </div>
//         </Collapse>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   goals: state.goal,
//   summary: summarySelector(state.income, state.expense, state.goal)
// });

// export default connect(mapStateToProps)(GoalList)
