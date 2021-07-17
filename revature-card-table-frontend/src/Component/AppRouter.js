import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import LoginDisplay from "./LoginDisplay";
import MyAccount from "./MyAccount";
import Register from "./Register";
import War from "./War.js";

export default function AppRouter({ isLoggedIn, setToken, token }) {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Home isLoggedIn={isLoggedIn} token={token}/>
        </Route>
        <Route path="/login" exact>
          <LoginDisplay setToken={setToken}/>
        </Route>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/war" exact component={War}></Route>
        <Route path="/my-account" exact>
          <MyAccount token={token} />
        </Route>

        {/* {loggedIn && (<Route path='/war' exact component={War}></Route>)} */}
      </Switch>
    </>
  );
}


