import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import { UserProvider, UserContext } from './lib';

import Admin from './pages';
import Theme from '../mernpark-themes';

import Login from './pages/login';

const MernParkAdmin = () => {
  return (
    <Router>
      <UserProvider>
        <Switch>
          <PrivateRoute path='/admin/:path?' exact component={Admin} />
          <Route path='/login' exact component={Login} />
          <Route path='/' component={Theme} />
        </Switch>
      </UserProvider>
    </Router>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {

  const { isLoggedIn } = useContext(UserContext);
  console.log('privateroute', isLoggedIn)

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn
          ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
      }
    />
  );

}

export default MernParkAdmin;
