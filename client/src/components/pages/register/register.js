import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from '../../../components/context/UserContext';

import './register.scss'; 
import imgUrl from '../../../assets/images/bg-login.jpg';
import Error from '../../../components/error';

const register = () => {

  const bgImage = {
    backgroundImage: 'url(' + imgUrl + ')'
  };

  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const [name, setName] = useState("");
  const [courriel, setCourriel] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setNewUser({
      "user_name": name,
      "user_email": courriel,
      "user_pass": password,
    });
  }, [name, courriel, password])
  
  const postData = async () => {

    const res = await fetch("/api/auth/register",{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser)
    });

    const response = await res.json();

    if(response.user_id){
      setIsLoggedIn(true)
    }else{
      setError(response)
    }

  }  

  const register = (e) => {
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
          <Link to={'/login'} className="cta">Se connecter</Link>
        </div>
      </div>
      <div>
        <div className="form-auth">
          <h2>Créer mon compte</h2>
          {error ? <Error value={error} /> : ""}
          <form onSubmit={register}>
            <p><input onChange={e => setName(e.target.value)} placeholder="Prénom et nom" type="text" /></p>
            <p><input onChange={e => setCourriel(e.target.value)} placeholder="Adresse courriel" type="text" /></p>
            <p><input onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" type="password" /></p>
            <p><button type="submit" className="cta blanc">M'enregistrer</button></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default register;
