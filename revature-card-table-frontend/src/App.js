import React, { useState } from "react";
import "./App.css";
import AppRouter from "./Component/AppRouter";
import BootstrapNavbar from "./Component/BootstrapNavbar";

export default function App() {
  const [token, setToken] = useState(
    {username: "",
    isLoggedIn: false
    });

    console.log(token);
  return (
    <div className="App">
      <BootstrapNavbar isLoggedIn={token.isLoggedIn} />
      <AppRouter isLoggedIn={token.isLoggedIn} setToken={setToken} />
    </div>
  );
}
