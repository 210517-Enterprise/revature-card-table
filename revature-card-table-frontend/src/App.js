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
<<<<<<< HEAD
    isLoggedIn: false
=======
    isLoggedIn:  true
>>>>>>> cc5de0700098074756694098e322276f162a0239
    });

    console.log(token);
  return (
    <div className="App">
      <AppRouter isLoggedIn={token.isLoggedIn} setToken={setToken} token={token} />
      <BootstrapNavbar isLoggedIn={token.isLoggedIn} setToken={setToken}/>
    </div>
  );
}
