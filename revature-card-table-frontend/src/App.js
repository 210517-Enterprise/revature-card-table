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
    isLoggedIn:  true
    });

    console.log(token);
  return (
    <div className="App">
      <AppRouter isLoggedIn={token.isLoggedIn} setToken={setToken} token={token} />
      <BootstrapNavbar isLoggedIn={token.isLoggedIn} setToken={setToken}/>
    </div>
  );
}
