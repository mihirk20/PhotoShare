import React, { useState, useCallback,useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./users/pages/Users";
import Register from "./users/pages/register"
import NewLocation from "./locations/pages/NewLocation";
import MainNavigation from "./common/components/Navigation/MainNavigation";
import UserLocations from "./locations/pages/UserLocations";
import Login from "./users/pages/Login";
import { LoginContext } from "./common/components/context";

const App = () => {
  const [userID, setUserID] = useState(null);
  const [isloggedin, setIsloggedin] = useState(false);
  const login = useCallback((uid) => {
    setUserID(uid);
    setIsloggedin(true);
    localStorage.setItem('userId', uid);
  localStorage.setItem('isLoggedIn', true);
  }, []);

  const logout = useCallback(() => {
    setIsloggedin(false);
    setUserID(null);
    localStorage.removeItem('userId');
  localStorage.removeItem('isLoggedIn');
  }, []);

  useEffect(() => {
    const storedUserID = localStorage.getItem('userId');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
  
    if (storedUserID && storedIsLoggedIn) {
      setUserID(storedUserID);
      setIsloggedin(true);
    }
  }, []);
  

  let validroutes;

  if (isloggedin) {
    validroutes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userid/locations">
          <UserLocations />
        </Route>
        <Route path="/locations/new" exact>
          <NewLocation />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    validroutes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userid/locations" exact>
          <UserLocations />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Redirect to="/"/>
      </Switch>
    );
  }

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn: isloggedin,
        userID: userID,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{validroutes}</main>
      </Router>
    </LoginContext.Provider>
  );
};

export default App;
