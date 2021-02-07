import React, { useContext } from "react";
import Cookies from 'universal-cookie';
import styles from "../../assets/styles/main.module.css"

import { UserContext } from '../../lib';

const LogoutButton = () => {
  const cookies = new Cookies();
  const { setUser } = useContext(UserContext);
  
  const logout = (e) => {
    e.preventDefault();
    cookies.remove('token');
    setUser({});
  }

  return (
    <div className={styles.LogoutButton}>
      <button className={`${styles.cta}`} onClick={logout}>Logout</button>
    </div>
  );
}

export default LogoutButton;
