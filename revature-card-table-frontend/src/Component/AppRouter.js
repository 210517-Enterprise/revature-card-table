import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

export default function AppRouter({ isLoggedIn }) {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Home isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/register" exact component={Register}></Route>

        {/* {loggedIn && (<Route path='/war' exact component={War}></Route>)} */}
      </Switch>
    </>
  );
}
