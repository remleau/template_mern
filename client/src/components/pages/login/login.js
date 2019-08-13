import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import './login.scss'; 
import imgUrl from '../../../assets/images/bg-login.jpg';
import Error from '../../../components/error';

const Login = () => {

  const bgImage = {
    backgroundImage: 'url(' + imgUrl + ')'
  };

  const [courriel, setCourriel] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    setNewUser({
      "user_email": courriel,
      "user_pass": password,
    });
  }, [courriel, password])
  
  const postData = async () => {

    const res = await fetch("/api/auth/login",{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser)
    });

    const response = await res.json();

    setResponse(response);

  }  

  const login = (e) => {
    e.preventDefault();
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
          <Link to={'/register'} className="cta">Créer un compte</Link>
        </div>
      </div>
      <div>
        <div className="form-auth">
          <h2>Me connecter à mon compte</h2>
          {response.message ? <Error value={response.message} /> : "" }
          {response.user_id ? <Redirect to="/" /> : "" }
          <form onSubmit={login}>
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
