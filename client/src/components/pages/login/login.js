import React from 'react';

import './login.scss';

const Login = () => {
  return (
    <div className="connexion-inscription">
      <div>
        <div className="overlay"></div>
        <div className="welcome">
          <h1>Bienvenue!</h1>
          <h2>Lorem ipsum dolor sit amet</h2>
          <p>Consectetur adipiscing elit. Phasellus ut consequat magna. Fusce cursus ligula lectus, a tincidunt dolor facilisis sit amet. Suspendisse eget nisi accumsan, fermentum nisi at, interdum nisi. Fusce ac metus cursus, auctor massa quis, pretium velit. Sed faucibus sit amet arcu eget tempus. </p>
          <p>Suspendisse eget nisi accumsan, fermentum nisi at, interdum nisi. Fusce ac metus cursus, auctor massa quis, pretium velit. Sed faucibus sit amet arcu eget tempus. </p>
          <a className="cta">Devenir client<span className="fa fa-exclamation" aria-hidden="true"></span></a>
        </div>
      </div>
      <div>
        <div className="form-auth">
          <h2>Or login to your account</h2>
          <form>
            <p><input placeholder="Utilisateur" type="text" /></p>
            <p><input placeholder="Mot de passe" type="password" /></p>
            <p><a className="cta blanc">Me connecter<span className="fa fa-sign-in" aria-hidden="true"></span></a><a>Mot de passe oublié?</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
