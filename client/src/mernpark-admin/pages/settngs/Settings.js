import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import styles from '../../assets/styles/main.module.css';
import FormError from '../../components/form';

import Modal from '../../components/modal';
import PageWrapper from '../../components/pageWrapper';

import { addUser, getAllUsers } from '../../lib';

const Settings = () => {
  const refModalAddUser = useRef();
  const [error, setError] = useState();
  const { register, handleSubmit, errors } = useForm();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  const meta = {
    pageTitle: "Settings",
    pageDescription: "In id aliquet ipsum, nec fermentum massa. Cras ultricies ultricies vestibulum.",
    bodyClass: "pageSettings"
  }


  const onSubmit = (formData) => {
    addUser(formData).then((res) => {
      console.log(res)
      if(res.error) {
        setError(res.error)
      } else {
        setError(null);
        setUsers(prevUsers => [...prevUsers, res.user] )
      }
    });
  }

  return (
    <PageWrapper meta={meta}>

      <div className={styles.containerTitle}>
        <h3 className={styles.h3}>List of users</h3>
        <div>
          <button className={styles.cta} onClick={() => refModalAddUser.current.openModal()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add User</span>
          </button>
        </div>
      </div>

      <Modal ref={refModalAddUser} dataClass="modalAddUser">
        <div className={styles.containerForm}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormError error={error} />

            <div className={styles.formHalf}>
              <div>
                <label>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>First name</span>
                </label>
                <input name="firstName" defaultValue="Rémy" className={errors.firstName && styles.errorInput} ref={register({ required: true })} />
                {errors.firstName && <span className={styles.errorField}>This field is required</span>}
              </div>

              <div>
                <label>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Last name</span>
                </label>
                <input name="lastName" defaultValue="Groleau" className={errors.lastName && styles.errorInput} ref={register({ required: true })} />
                {errors.lastName && <span className={styles.errorField}>This field is required</span>}
              </div>
            </div>

            <div className={styles.formHalf}>
              <div>
                <label>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Username</span>
                </label>
                <input name="username" defaultValue="remleau" className={errors.username && styles.errorInput} ref={register({ required: true })} />
                {errors.username && <span className={styles.errorField}>This field is required</span>}
              </div>

              <div>
                <label>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>E-mail</span>
                </label>
                <input name="email" type="email" defaultValue="remleau@gmail.com" className={errors.email && styles.errorInput} ref={register({ required: true })} />
                {errors.email && <span className={styles.errorField}>This field is required</span>}
              </div>
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

            <button type="submit" className={styles.cta}>Add User</button>
          </form>
        </div>
      </Modal>

      <table className={styles.table}>
        <thead>
          <tr>
            <th><p>Full Name</p></th>
            <th><p>Email</p></th>
            <th><p>Last connexion</p></th>
            <th><p>Actions</p></th>
          </tr>
        </thead>
        <tbody>
          {users && Object.keys(users).map(function (key) {
            return (
              <tr key={key}>
                <td>{users[key].firstName} {users[key].lastName}</td>
                <td>{users[key].email}</td>
                <td>{users[key].lastConnexion ?? '-'}</td>
                <td>Modify | Delete</td>
              </tr>
            )
          })}
        </tbody>
      </table>

    </PageWrapper>
  );
}

export default Settings;
