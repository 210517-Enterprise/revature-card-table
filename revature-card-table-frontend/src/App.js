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
    isLoggedIn:  false
=======
    isLoggedIn: false
>>>>>>> 1236aafc9a596d8424586fde3c51a0155cf927bf
    });

    console.log(token);
  return (
    <div className="App">
      <AppRouter isLoggedIn={token.isLoggedIn} setToken={setToken} token={token} />
      <BootstrapNavbar isLoggedIn={token.isLoggedIn} setToken={setToken}/>
    </div>
  );
}
