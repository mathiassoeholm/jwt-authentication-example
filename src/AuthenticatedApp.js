import React from "react";
import { Route, Switch, Redirect } from "wouter";
import { useUser } from "./hooks/use-user";

function AuthenticatedApp() {
  const { user } = useUser();

  return (
    <Switch>
      <Route path="/">
        <p>Logged in as: {user.email}</p>
        <button>Logout</button>
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
