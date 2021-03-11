import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { UserProvider, UserContext } from './lib';

import Admin from './pages';
import Theme from '../mernpark-themes';

import Login from './pages/login';

const MernParkAdmin = () => {
  return (
    <Router>
      <UserProvider>
        <Switch>
          <PrivateRoute path='/admin' component={Admin} />
          <Route path='/login' exact component={Login} />
          <Route path='/' component={Theme} />
        </Switch>
      </UserProvider>
    </Router>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {

  const { user } = useContext(UserContext);
  
  return (
    <Route
      {...rest}
      render={props =>
        user && user?.isLoggedIn
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
