import React, { useState, useContext, useEffect } from "react";
import styles from '../../assets/styles/main.module.css';

import { getAllUsers } from '../../lib';

const Settings = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <div>
      <div className={styles.pageTitle}>
        <div className={styles.title}>
          <h1 className={styles.h1}>Settings</h1>
        </div>
        <div className={styles.description}>
          <p>In id aliquet ipsum, nec fermentum massa. Cras ultricies ultricies vestibulum.</p>
        </div>
      </div>

      <div className="">
        <div className="">
          <h3 className={styles.h3}>List of users</h3>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th><p>Full Name</p></th>
                <th><p>Email</p></th>
                <th><p>Last connexion</p></th>
              </tr>
            </thead>
            <tbody>
              {users && Object.keys(users).map(function (key) {
                return (
                  <tr key={key}>
                    <td>{users[key].firstName} {users[key].lastName}</td>
                    <td>{users[key].email}</td>
                    <td>{users[key].lastConnexion}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Settings;
