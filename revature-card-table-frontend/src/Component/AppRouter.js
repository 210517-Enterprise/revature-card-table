import { Route, Switch } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import LoginDisplay from "./LoginDisplay";
import MatchingGame from "./MatchingGame";
import MyAccount from "./MyAccount";
import Register from "./Register";
import Speed from "./Speed";
import War from "./War";
import SingleMatchingGame from "./SingleMatchingGame";

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
        <Route path="/speed/" exact component={Speed}></Route>
        <Route path="/my-account" exact>
          <MyAccount token={token} />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPassword username={token.username} />
        </Route>

        <Route path="/leaderboard" exact>
          <Leaderboard />
        </Route>

        <Route path="/matching-game" exact>
          <SingleMatchingGame token={token}/>
        </Route>

        {/* {loggedIn && (<Route path='/war' exact component={War}></Route>)} */}
      </Switch>
    </>
  );
}


