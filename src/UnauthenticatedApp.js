import React from "react";
import { Route, Switch, Redirect } from "wouter";

import { Login } from "./Login";
import { Signup } from "./Signup";

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
