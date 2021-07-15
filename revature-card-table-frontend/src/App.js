import React, { useState } from "react";
import "./App.css";
import AppRouter from "./Component/AppRouter";
import BootstrapNavbar from "./Component/BootstrapNavbar";

export default function App() {
  const [loggedIn, updateLogin] = useState(false);

  return (
    <div className="App">
<<<<<<< Updated upstream
      <BootstrapNavbar isLoggedIn={loggedIn} />
      <AppRouter isLoggedIn={loggedIn} />
=======
      <AppRouter isLoggedIn={true} />
      <BootstrapNavbar isLoggedIn={true} />
>>>>>>> Stashed changes
    </div>
  );
}
