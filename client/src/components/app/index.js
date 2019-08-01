import React from 'react';

import './../../assets/css/scss/index.scss';

import Header from '../../components/header';
import Footer from '../../components/footer';
import Loginpage from '../../components/pages/login';

const App = () => {
  return(
    <div className="App">
      <Header/>
      <Loginpage/>
        <div>content</div>
      <Footer/>
    </div>
  );
};

export default App;
