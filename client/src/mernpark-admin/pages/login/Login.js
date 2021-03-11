import React, { useContext, useState } from "react";
import { Redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { authUser, UserContext, socketInstance } from '../../lib';

import FormError from '../../components/form';

import styles from '../../assets/styles/main.module.css';


const Login = () => {
  const [error, setError] = useState();
  const { register, handleSubmit, errors } = useForm();
  const { user, setUser } = useContext(UserContext);

  const onSubmit = (formData) => {
    authUser(formData).then((user) => {
      if (user.error){
        setError(user.error)
      } else {
        socketInstance.emit("loginUser", user);
        setUser(user);
      }
    })
  }

  if (user && user?.isLoggedIn) {
    return (
      <Redirect to={"/admin"} />
    )
  }

  return (
    <div className={styles.containerLogin}>

      <div className={styles.containerLeft}>
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.containerRight}>
        <div>

          <div className={styles.textForm}>
            <h1 className={styles.h1}>Lorem ipsum</h1>
            <h3 className={styles.h3}>Aliquam posuere eros, donec pretium dignissim volutpat</h3>
          </div>
          
          <div className={styles.containerForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormError error={error} />

              <div>
                <label>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Username/E-mail</span>
                </label>
                <input name="username" defaultValue="remleau" className={errors.username && styles.errorInput} ref={register({ required: true })} />
                {errors.username && <span className={styles.errorField}>This field is required</span>}
              </div>

              <div>
                <label>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <span>Password</span>
                </label>
                <input name="password" defaultValue="allo1234" type="password" className={errors.password && styles.errorInput} ref={register({ required: true })} />
                {errors.password && <span className={styles.errorField}>This field is required</span>}
              </div>

              <button type="submit" className={styles.cta}>Login</button>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Login;
