import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import styles from '../assets/styles/main.module.css';

import Header from '../components/header';
import Dashboard from './dashboard';
import Settings from './settngs';
import Page404 from './dashboard';

const Pages = () => {
  return (
    <div className={styles.containerMernAdmin}>
      <Header />
      <Switch>
        <Route path='/admin' exact component={Dashboard} />
        <Route path='/admin/settings' component={Settings} />
        <Route path="*" component={Page404} />
      </Switch>
    </div>
  );
}

export default Pages;
