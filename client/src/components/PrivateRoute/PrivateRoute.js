import React, { useState } from 'react';
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component , ...rest }) => {

    const [auth, setAuth] = useState(true);

    console.log(auth)

    return (
        <Route {...rest} render={props => (
                <Component {...props} />
        )} />
    )

};