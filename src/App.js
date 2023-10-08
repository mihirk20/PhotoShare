import React, { useState, useCallback } from "react";
import Users from "./users/pages/Users";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NewLocations from "./locations/pages/NewLocations";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import MainNavigation from "./common/components/Navigation/MainNavigation";
import UserLocations from "./locations/pages/UserLocations";
import Login from "./users/pages/Login";
import { LoginContext } from "./common/components/context";

const App = () => {
  const [userID, setUserID] = useState(null);
  const [isloggedin, setloggedin] = useState(false);
  const login = useCallback((uid) => {
    setUserID(uid);
    setloggedin(true);
  }, []);
  const logout = useCallback(() => {
    setUserID(null);
    setloggedin(false);
  }, []);

  let validRoutes;
  if (isloggedin) {
    validRoutes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userid/locations">
          <UserLocations />
        </Route>
        <Route path="/locations/new" exact>
          <NewLocations />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }
  else {
    validRoutes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path to="/Login">
          <Login />
        </Route>
        <Redirect to="/login" />
      </Switch>
    )
  }
  return (
    <LoginContext.Provider value={{ isloggedin: isloggedin, userID: userID, login: login, logout: logout }}>
      <Router>
        <MainNavigation />
        <main>
          {validRoutes}
        </main>
      </Router>
    </LoginContext.Provider>
  )
}
export default App;