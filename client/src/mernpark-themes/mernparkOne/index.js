import {
  Switch,
  Route
} from "react-router-dom";

import styles from './assets/styles/main.module.scss';

const MernParkOne = () => {
  return (
    <div className={styles.mernParkOne}>
      <Switch>
        <Route path='/' exact>
          allo
        </Route>
        <Route path='/allo2' exact>
          allo2
        </Route>
        <Route path="*">
          404
        </Route>
      </Switch>
    </div>
  );
}

export default MernParkOne;
