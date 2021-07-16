import { Route, Switch } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import Home from "./Home";
import LoginDisplay from "./LoginDisplay";
import MyAccount from "./MyAccount";
import Register from "./Register";
import War from "./War";

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
        <Route path="/forgot-password" exact>
          <ForgotPassword username={token.username} />
        </Route>

        {/* {loggedIn && (<Route path='/war' exact component={War}></Route>)} */}
      </Switch>
    </>
  );
}


