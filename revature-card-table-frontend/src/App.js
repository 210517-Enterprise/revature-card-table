import React, { Component } from "react";

import { Layout, Header } from "./Layout.components";
import BootstrapNavbar from "./Component/BootstrapNavbar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <BootstrapNavbar />
        </Layout>
      </div>
    );
  }
}

export default App;
