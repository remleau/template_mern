import React, { useContext } from "react";
import styles from '../../assets/styles/main.module.css';

import { UserContext } from '../../lib';

const ProfilCard = () => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.profilCard}>
      <div className={styles.avatar}>
        <img src="" alt="" />
      </div>
      <div>
        <p>{user.firstName} {user.lastName}</p>
        <p>{user.email}</p>
      </div>
    </div>
  );
}

export default ProfilCard;
