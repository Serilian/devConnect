import React from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Navbar/>
        <Route exact path={"/"} component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/register"} component={Register} />
          </Switch>
        </section>
      </>
    </BrowserRouter>
  );
};

export default App;
