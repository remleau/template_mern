import React, { useContext } from 'react';
import { Redirect, Route } from "react-router-dom";
import { UserContext } from './../../components/context/UserContext';

export const PrivateRoute = ({ component, ...options }) => {
  const [user] = useContext(UserContext);
  const finalComponent = user ? (component) : (<Redirect to="/login" />);
  return <Route {...options} component={finalComponent} />;
};