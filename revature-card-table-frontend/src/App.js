import React, { Component } from "react";
import { Layout, Header } from "./Layout.components";
import BootstrapNavbar from "./Component/BootstrapNavbar";
import {Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from './Component/Home';
import Login from './Component/Login';
import Register from './Component/Register';
import {useState} from 'react';


export default function App() {
  const [loggedIn, updateLogin] = useState(false);

    return (
      <div className="App">
        <BootstrapNavbar isLoggedIn={false}/>
        <Switch>
          <Route path='/' exact><Home isLoggedIn={false}/></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/register' exact component={Register}></Route>
          
          {/* {loggedIn && (<Route path='/war' exact component={War}></Route>)} */}
        </Switch>
      </div>
    );
}

