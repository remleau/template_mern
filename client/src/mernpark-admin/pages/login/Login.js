import React, { useContext, useState } from "react";
import { Redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { authUser, UserContext, getToken } from '../../lib';

import FormError from '../../components/form';

import styles from '../../assets/styles/main.module.css';


const Login = () => {
  const [error, setError] = useState();
  const { register, handleSubmit, errors } = useForm();
  const { isLoggedIn } = useContext(UserContext);

  const onSubmit = (formData) => {
    authUser(formData).then((err) => {
      setError(err);
    })
  }

  if (isLoggedIn && getToken()) {
    return (
      <Redirect to={"/admin"} />
    )
  }

  return (
    <div className={styles.containerLogin}>

      <div className={styles.containerLeft}>
      </div>

      <div className={styles.containerRight}>
        <div>

          <div className={styles.textForm}>
            <h1 className={styles.h1}>Lorem ipsum</h1>
            <h3 className={styles.h3}>Aliquam posuere eros</h3>
          </div>
          
          <div className={styles.containerForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormError error={error} />

              <div>
                <label>Username/E-mail</label>
                <input name="username" defaultValue="remleau1" className={errors.username && styles.errorInput} ref={register({ required: true })} />
                {errors.username && <span className={styles.errorField}>This field is required</span>}
              </div>

              <div>
                <label>Password</label>
                <input name="password" defaultValue="allo1234" type="password" className={errors.password && styles.errorInput} ref={register({ required: true })} />
                {errors.password && <span className={styles.errorField}>This field is required</span>}
              </div>

              <button type="submit">Login</button>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Login;
