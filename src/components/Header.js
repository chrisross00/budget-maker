import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { history } from '../routers/AppRouter';
import SummaryHeader from '../components/SummaryHeader';
import Progress from '../components/Progress';
import WhatIfSummary from './WhatIfSummary';

export const Header = ({ startLogout, progress }) => (
  <div className="stickyHeader--sticky">
    <header className="header">
      <div className="content-container">
        <div className="header__content">
          <Link
            className="header__title"
            to="/">
            <h1>Budget Maker</h1>
          </Link>
          <button className="button button--link" onClick={startLogout}>Logout</button>
        </div>
        <ul className="navheader__content">
          <li>
            <Link
              className={history.location.pathname === '/dashboard' ? 'header__link--active' : 'header__link'}
              to="/">
              Summary
          </Link>
          </li>
          <li>
            <Link
              className={history.location.pathname === '/income' ? 'header__link--active' : 'header__link'}
              to="/income">
              Income
          </Link>
          </li>
          <li>
            <Link
              className={history.location.pathname === '/Expenses' ? 'header__link--active' : 'header__link'}
              to="/Expenses">
              Expenses
          </Link>
          </li>
          <li>
            <Link
              className={history.location.pathname === '/Goals' ? 'header__link--active' : 'header__link'}
              to="/Goals">
              Goals
          </Link>
          </li>
          <li>
            <Link
              className={history.location.pathname === '/whatif' ? 'header__link--active' : 'header__link'}
              to="/whatif">
              What-If
          </Link>
          </li>
        </ul>
      </div>
    </header>
    <div>
      {progress.setupDone
        ? ''
        : <Progress
          {...progress} />
      }
      {
        history.location.pathname === '/whatif'
          ? <WhatIfSummary />
          : <SummaryHeader />
      }
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  progress: state.progress
})

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
