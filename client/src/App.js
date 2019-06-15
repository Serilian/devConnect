import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/alert";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import NotFound from "./components/layout/NotFound";
import Routes from "./components/routing/routes";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <>
          <Navbar/>
          <Switch>
            <Route exact path={"/"} component={Landing}/>
            <Route component={Routes}/>

          </Switch>
        </>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
