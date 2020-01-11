import React from "react";
import { Route, Switch, Redirect } from "wouter";

import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

function UnauthenticatedApp() {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="login" />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/:rest*">404, not found!</Route>
    </Switch>
  );
}

export { UnauthenticatedApp };
