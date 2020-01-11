import React, { createContext, useContext, useState } from "react";

const UserContext = createContext({});

function UserProvider({ children }) {
  const localUserJson = localStorage.getItem("user");
  const localUser = localUserJson && JSON.parse(localUserJson);
  const [user, setUser] = useState(localUser);

  const saveUser = user => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const deleteUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, saveUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
