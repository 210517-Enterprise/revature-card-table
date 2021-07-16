import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import LoginDisplay from "./LoginDisplay";
import Register from "./Register";
import Speed from "./Speed";

export default function AppRouter({ isLoggedIn, setToken }) {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Home isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="/login" exact>
          <LoginDisplay setToken={setToken}/>
        </Route>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/war" exact component={War}></Route>
        <Route path="/speed/" exact component={Speed}></Route>

        {/* {loggedIn && (<Route path='/war' exact component={War}></Route>)} */}
      </Switch>
    </>
  );
}

const War = () => {
  return <h1>This is War</h1>
}
