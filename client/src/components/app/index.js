import React from 'react';
import { Switch, Route } from 'react-router-dom'

import {UserProvider} from '../../components/context/UserContext.js';

import Header from '../../components/header';
import Footer from '../../components/footer';
import Loginpage from '../../components/pages/login';
import Registerpage from '../../components/pages/register';
import Dashboardpage from '../../components/pages/dashboard';

const App = () => {  
  return(
    <UserProvider>
      <div className="App">
        <Header/>
          <Switch>
            <Route exact path='/' component={Loginpage} />
            <Route exact path='/login' component={Loginpage} />
            <Route path='/register' component={Registerpage} />
            <Route path='/dashboard' component={Dashboardpage} />
          </Switch>
        <Footer/>
      </div>
    </UserProvider>
  );
};

export default App;
