import {
  Switch,
  Route
} from "react-router-dom";

const MernParkOne = () => {
  return (
    <div className="App">
      <Switch>
        <Route path='/allo' exact>
          allo
        </Route>
        <Route path='/allo2' exact>
          allo2
        </Route>
      </Switch>
    </div>
  );
}

export default MernParkOne;
