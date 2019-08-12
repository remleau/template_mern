import React, { useState, useEffect } from 'react';

import {UserProvider} from '../../components/context/UserContext.js';

import Header from '../../components/header';
import Footer from '../../components/footer';
import Loginpage from '../../components/pages/login';

const App = () => {  
  return(
    <UserProvider>
      <div className="App">
        <Header/>
          <Loginpage/>
        <Footer/>
      </div>
    </UserProvider>
  );
};

export default App;
