import React, { useState } from "react";
import "./App.css";
import AppRouter from "./Component/AppRouter";
import BootstrapNavbar from "./Component/BootstrapNavbar";

export default function App() {
  const [token, setToken] = useState(
    {username: "",
    id: "",
    first_name: "",
    last_name: "",
    isLoggedIn:  false
    });

    if (sessionStorage.getItem('user')) {
      const user = sessionStorage.getItem('user')
      if (JSON.stringify(token) !== user) {
        let parseUser = JSON.parse(user);
        setToken(parseUser);
      }
    }

    console.log(token);
  return (
    <div className="App">
      <AppRouter isLoggedIn={token.isLoggedIn} setToken={setToken} token={token} />
      <BootstrapNavbar isLoggedIn={token.isLoggedIn} setToken={setToken} token={token}/>
    </div>
  );
}
