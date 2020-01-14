import React from "react";
import { useAuth } from "../providers/auth-provider";

function Home() {
  const { user, logout } = useAuth();

  return (
    <>
      <p>Logged in as: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export { Home };
