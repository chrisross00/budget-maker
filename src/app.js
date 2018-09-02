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
import { startSetIncome } from './actions/income';
import { startSetExpenses } from './actions/expense';
import { startSetGoals } from './actions/goal';
import { startSetProgress } from './actions/progress';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const loadPage = () => (dispatch) => {
  return Promise.resolve(
    dispatch(startSetProgress()),
    dispatch(startSetIncome()),
    dispatch(startSetExpenses()),
    dispatch(startSetGoals())
  ).then(() => {
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  })
}
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    console.log('uid', user.uid);
    store.dispatch(loadPage());
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
// const unsubscribe = store.subscribe(() => {
//   console.log(store.getState());
// });
