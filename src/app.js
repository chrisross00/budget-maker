import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import expensesFixture from './tests/fixures/expenses';
import goalsFixture from './tests/fixures/goals';
import incomefixture from './tests/fixures/income';
import { addExpense } from './actions/expense';
import { addGoal } from './actions/goal';
import { addIncome } from './actions/income';
import { addWhatIfExpense, addWhatIfGoal, addWhatIfIncome } from './actions/whatIf';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};
// // RATS - this is just to get an expense object in for testing purposes
// store.dispatch(addExpense(expensesFixture[0]));
// store.dispatch(addExpense(expensesFixture[1]));
// store.dispatch(addExpense(expensesFixture[2]));
// store.dispatch(addExpense(expensesFixture[3]));
// store.dispatch(addExpense(expensesFixture[4]));
// store.dispatch(addExpense(expensesFixture[5]));
// store.dispatch(addExpense(expensesFixture[6]));
// store.dispatch(addExpense(expensesFixture[7]));
// store.dispatch(addWhatIfExpense(expensesFixture[0]));
// store.dispatch(addWhatIfExpense(expensesFixture[1]));
// store.dispatch(addWhatIfExpense(expensesFixture[2]));
// store.dispatch(addWhatIfExpense(expensesFixture[3]));
// store.dispatch(addWhatIfExpense(expensesFixture[4]));
// store.dispatch(addWhatIfExpense(expensesFixture[5]));
// store.dispatch(addWhatIfExpense(expensesFixture[6]));
// store.dispatch(addWhatIfExpense(expensesFixture[7]));
// store.dispatch(addGoal(goalsFixture))
// store.dispatch(addIncome(incomefixture))
// store.dispatch(addWhatIfGoal(goalsFixture))
// store.dispatch(addWhatIfIncome(incomefixture))
// // End RATS


ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    console.log('uid', user.uid);
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
