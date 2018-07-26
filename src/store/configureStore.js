import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import frequencyTypeReducer from '../reducers/frequencyType';
import incomeReducer from '../reducers/income';
import incomeTypeReducer from '../reducers/incomeType';

const composeEnhancers = window.__REDUX_DEVTOOLS_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      frequencyType: frequencyTypeReducer,
      incomeType: incomeTypeReducer,
      income: incomeReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
