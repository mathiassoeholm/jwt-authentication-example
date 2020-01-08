import React from "react";
import { UnauthenticatedApp } from "./UnauthenticatedApp";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { useUser } from "./hooks/use-user";

function App() {
  const { user } = useUser();
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
