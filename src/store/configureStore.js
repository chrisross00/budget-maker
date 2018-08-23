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
import progressReducer from '../reducers/progress';
import whatIfIncomeReducer from '../reducers/whatIfIncome';
import whatIfExpenseReducer from '../reducers/whatIfExpense';
import whatIfGoalReducer from '../reducers/whatIfGoal';
import whatIfReducer from '../reducers/whatIfs';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
      income: incomeReducer,
      progress: progressReducer,
      whatIfIncome: whatIfIncomeReducer,
      whatIfExpense: whatIfExpenseReducer,
      whatIfGoal: whatIfGoalReducer,
      whatIfs: whatIfReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
