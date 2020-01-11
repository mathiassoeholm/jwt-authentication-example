import React from "react";
import { Route, Switch, Redirect } from "wouter";
import { Home } from "./pages/Home";

function AuthenticatedApp() {
  return (
    <Switch>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Redirect to="/" />
      </Route>
      <Route path="/signup">
        <Redirect to="/" />
      </Route>
      <Route path="/:rest*">404, not found!</Route>
    </Switch>
  );
}

export { AuthenticatedApp };
