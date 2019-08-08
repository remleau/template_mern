import React, { useState, useEffect } from 'react';

import Header from '../../components/header';
import Footer from '../../components/footer';
import Loginpage from '../../components/pages/login';

const App = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/dashboard")
      .then(response => response.json())
      .then(data => setData(data));
  },[]);

  console.log(data)  
    
  return(
    <div className="App">
      <Header/>
        <Loginpage/>
      <Footer/>
    </div>
  );
};

export default App;
