import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({});

function UserProvider({ children }) {
  const [user, setUser] = useState(undefined);

  const fetchUser = async () => {
    try {
      const user = await fetch("/.netlify/functions/user", {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }).json();

      setUser(user);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ fetchUser, user }}>
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
