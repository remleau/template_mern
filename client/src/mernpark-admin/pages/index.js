import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import styles from '../assets/styles/main.module.css';

import Header from '../components/header';
import Dashboard from './dashboard';
import { Voyages, AddVoyage } from './voyages';
import Settings from './settngs';
import Page404 from './page404';
import UserProfile from './userProfile';

const Pages = () => {
  return (
    <div className={styles.containerMernAdmin}>
      <Header />
      <Switch>
        <Route path='/admin' exact component={Dashboard} />
        <Route path='/admin/voyages' exact component={Voyages} />
        <Route path='/admin/voyages/a/:voyage_id' exact component={AddVoyage} />
        <Route path='/admin/settings' component={Settings} />
        <Route path='/admin/user/:user_id' exact component={UserProfile} />
        <Route path="*" component={Page404} />
      </Switch>
    </div>
  );
}

export default Pages;
