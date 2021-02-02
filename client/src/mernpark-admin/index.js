import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Admin from './pages';
import Theme from '../mernpark-themes';

import Login from './pages/login';

const MernParkAdmin = () => {
  return (
    <Router>
      <Switch>
        <Route path='/admin/:path?' exact component={Admin} />
        <Route path='/login' exact component={Login} />
        <Route path='/' component={Theme} />
      </Switch>
    </Router>
  );
}

export default MernParkAdmin;
