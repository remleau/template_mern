import React from "react";
import styles from '../../assets/styles/main.module.css'

import Footer from '../footer';

const PageWrapper = ({children, meta}) => {

  const newMeta = {
    ...{
      pageTitle: "Lorem ipsum",
      pageDescription: "Dolar sit amet in id aliquet ipsum, nec fermentum massa.",
      bodyClass: 'pageDefault'
    },
    ...meta
  }

  const { pageTitle, pageDescription, bodyClass } = newMeta;

  return (
    <main className={styles.main}>

      <div className={styles.mainPageTitle}>
        <div className={styles.mainTitle}>
          <h1 className={styles.h1}>{pageTitle}</h1>
        </div>
        <div className={styles.mainDescription}>
          <p>{pageDescription}</p>
        </div>
      </div>

      <div className={`${styles.pageDefault} ${styles.[bodyClass]}`}>
      {children}
      </div>

      <Footer />

    </main>
  );
}

export default PageWrapper;
