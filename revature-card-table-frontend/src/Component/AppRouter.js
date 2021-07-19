import { Redirect, Route, Switch } from "react-router-dom";
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
import { cloneElement, Children } from 'react';
import Pickup from "./Pickup";
import Rules from "./Rules";

const PrivateRoute = ({ children, isLoggedIn, ...rest }) =>
  <Route
    {...rest}
    render={(props) => isLoggedIn ?
      <>
        {Children.map(children, child => cloneElement(child, { ...child.props }))}
      </>
      :
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
  />

export default function AppRouter({ isLoggedIn, setToken, token }) {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Home isLoggedIn={isLoggedIn} token={token} />
        </Route>

        <Route path="/login" exact>
          <LoginDisplay setToken={setToken} />
        </Route>

        <Route path="/register" exact component={Register}></Route>

        <Route path="/forgot-password" exact>
          <ForgotPassword username={token.username} />
        </Route>

        <Route path="/leaderboard" exact>
          <Leaderboard />
        </Route>

        <Route path="/rules">
          <Rules />
        </Route>

        <PrivateRoute path='/war' isLoggedIn={isLoggedIn}>
          <Route path="/war" exact >
            <War token={token} />
          </Route>
        </PrivateRoute>

        <PrivateRoute path='/pickup' isLoggedIn={isLoggedIn}>
          <Route path="/pickup" exact>
            <Pickup token={token} />
          </Route>
        </PrivateRoute>

        <PrivateRoute path='/speed' isLoggedIn={isLoggedIn}>
          <Route path="/speed" exact>
            <Speed username={token.username} />
          </Route>
        </PrivateRoute>

        <PrivateRoute path='/my-account' isLoggedIn={isLoggedIn} >
          <Route path="/my-account" exact>
            <MyAccount token={token} />
          </Route>
        </PrivateRoute>

        <PrivateRoute path='/matching-game' isLoggedIn={isLoggedIn} >
          <Route path="/matching-game" exact>
            <SingleMatchingGame token={token} />
          </Route>
        </PrivateRoute>
      </Switch>
    </>
  );
}


