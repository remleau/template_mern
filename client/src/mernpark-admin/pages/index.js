import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import styles from '../assets/styles/main.module.css';

import Header from '../components/header';
import Footer from '../components/footer';

import Dashboard from './dashboard';
import Settings from './dashboard';
import Page404 from './dashboard';

const Pages = () => {
  return (
    <div className={styles.containerMernAdmin}>
      <Header />
      <div className={styles.containerMernPages}>
        <Switch>
          <Route path='/admin' exact component={Dashboard} />
          <Route path='/admin/settings' component={Settings} />
          <Route path="*" component={Page404} />
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default Pages;
