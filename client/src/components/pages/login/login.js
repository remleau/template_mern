import React, { useState, useEffect } from 'react';

import './login.scss'; 
import imgUrl from '../../../assets/images/bg-login.jpg';

const Login = () => {

  const bgImage = {
    backgroundImage: 'url(' + imgUrl + ')'
  };

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [courriel, setCourriel] = useState("");
  
  
  const login = (e) => {
    e.preventDefault();
    const [newUser, setNewUser] = useState("");
    const postData = () => {
      const response = fetch("/api/auth/register",{
        method: "POST",
        body: JSON.stringify(newUser)
      });
    }
    setNewUser({
      "user_name": name,
      "user_email": courriel,
      "user_pass": password,
    });
    postData();
  }

  return (
    <div className="connexion-inscription">
      <div style={bgImage}>
        <div className="overlay gris-fonce"></div>
        <div className="welcome">
          <h1>Bienvenue!</h1>
          <h2>Lorem ipsum dolor sit amet</h2>
          <p>Consectetur adipiscing elit. Phasellus ut consequat magna. Fusce cursus ligula lectus, a tincidunt dolor facilisis sit amet. Suspendisse eget nisi accumsan, fermentum nisi at, interdum nisi. Fusce ac metus cursus, auctor massa quis, pretium velit. Sed faucibus sit amet arcu eget tempus. </p>
          <p>Suspendisse eget nisi accumsan, fermentum nisi at, interdum nisi. Fusce ac metus cursus, auctor massa quis, pretium velit. Sed faucibus sit amet arcu eget tempus. </p>
          <a className="cta">Call to action</a>
        </div>
      </div>
      <div>
        <div className="form-auth">
          <h2>Or login to your account</h2>
          <form onSubmit={login}>
            <p><input onChange={e => setName(e.target.value)} placeholder="Prénom et nom" type="text" /></p>
            <p><input onChange={e => setCourriel(e.target.value)} placeholder="Adresse courriel" type="text" /></p>
            <p><input onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" type="password" /></p>
            <p><button type="submit" className="cta blanc">Me connecter</button><a>Mot de passe oublié?</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
