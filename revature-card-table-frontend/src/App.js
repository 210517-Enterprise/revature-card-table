import React, { Component } from "react";

import { Layout, Header } from "./Layout.components";
import BootstrapNavbar from "./Component/BootstrapNavbar";
import "./App.css";
import Leaderboard from "./Component/Leaderboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Leaderboard />
        </Layout>
      </div>
    );
  }
}

export default App;
