import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Theme from '../mernpark-themes';

import Dashboard from './pages/dashboard';
import Settings from './pages/dashboard';
import AdminPage404 from './pages/dashboard';

import ThemePage404 from './pages/dashboard';

const MernParkAdmin = () => {
  return (
    <Router>
      <Switch>

        <Route path='/admin/:path?' exact>
          <Switch>
            <Route path='/admin' exact component={Dashboard} />
            <Route path='/admin/settings' component={Settings} />
            <Route path="*" component={AdminPage404} />
          </Switch>
        </Route>

        <Route path='/'>
          <Theme />
        </Route>

        <Route path="*" component={ThemePage404} />

      </Switch>
    </Router>
  );
}

export default MernParkAdmin;
