import React from 'react';

import Header from '../../components/header';
import Footer from '../../components/footer';
import Loginpage from '../../components/pages/login';

const App = () => {
  return(
    <div className="App">
      <Header/>
        <Loginpage/>
      <Footer/>
    </div>
  );
};

export default App;
