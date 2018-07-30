import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import expenseCategoryReducer from '../reducers/expenseCategory';
import emergencyFundReducer from '../reducers/emergencyFund';
import expenseReducer from '../reducers/expense';
import expenseTypeReducer from '../reducers/expenseType';
import frequencyTypeReducer from '../reducers/frequencyType';
import goalReducer from '../reducers/goal';
import goalTypeReducer from '../reducers/goalType';
import incomeReducer from '../reducers/income';
import incomeTypeReducer from '../reducers/incomeType';

const composeEnhancers = window.__REDUX_DEVTOOLS_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      emergencyFund: emergencyFundReducer,
      expense: expenseReducer,
      expenseCategory: expenseCategoryReducer,
      expenseType: expenseTypeReducer,
      frequencyType: frequencyTypeReducer,
      goal: goalReducer,
      goalType: goalTypeReducer,
      incomeType: incomeTypeReducer,
      income: incomeReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
