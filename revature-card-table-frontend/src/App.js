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
    isLoggedIn: false
    });

    console.log(token);
  return (
    <div className="App">
      <AppRouter isLoggedIn={token.isLoggedIn} setToken={setToken} />
      <BootstrapNavbar isLoggedIn={token.isLoggedIn} />
    </div>
  );
}
