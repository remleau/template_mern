import React from "react";
import styles from '../../assets/styles/main.module.css';

const FormError = (props) => {
  const { error } = props;

  return (
    <React.Fragment>
      { error && 
        <div className={styles.errorFormMessage}>
          <p>{error}</p>
        </div>
      }
    </React.Fragment>
  )
}

export default FormError;
