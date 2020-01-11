import React from "react";
import { useUser } from "../hooks/use-user";
import { useLogout } from "../hooks/use-logout";

function Home() {
  const { user } = useUser();
  const logout = useLogout();

  return (
    <>
      <p>Logged in as: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export { Home };
