import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import expenseCategoryReducer from '../reducers/expenseCategory';
import expenseReducer from '../reducers/expense';
import expenseTypeReducer from '../reducers/expenseType';
import frequencyTypeReducer from '../reducers/frequencyType';
import incomeReducer from '../reducers/income';
import incomeTypeReducer from '../reducers/incomeType';

const composeEnhancers = window.__REDUX_DEVTOOLS_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      expense: expenseReducer,
      expenseCategory: expenseCategoryReducer,
      expenseType: expenseTypeReducer,
      frequencyType: frequencyTypeReducer,
      incomeType: incomeTypeReducer,
      income: incomeReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
