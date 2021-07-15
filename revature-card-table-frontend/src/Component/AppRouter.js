import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import LoginDisplay from "./LoginDisplay";
import Register from "./Register";
import War from "./War";

export default function AppRouter({ isLoggedIn }) {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Home isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="/login" exact component={LoginDisplay}></Route>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/war" exact component={War}></Route>

        {/* {loggedIn && (<Route path='/war' exact component={War}></Route>)} */}
      </Switch>
    </>
  );
}


