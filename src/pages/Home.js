import React, { useState } from "react";
import { useAuth } from "../providers/auth-provider";

function Home() {
  const { user, logout } = useAuth();
  const [userInfo, setUserInfo] = useState();

  const verifyUser = async () => {
    const response = await fetch(`/.netlify/functions/user`);
    if (response.ok) {
      setUserInfo(await response.text());
    } else if (response.status === 401) {
      logout();
    }
  };

  return (
    <>
      <p>Logged in as: {user.email}</p>
      <button onClick={logout}>Logout</button>
      <button onClick={verifyUser}>Verify user</button>
      {userInfo && <p>User ok: {userInfo}</p>}
    </>
  );
}

export { Home };
