"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
  lastLogonTime: number;
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const defaultUser: User = {
  lastLogonTime: Date.now(),
};

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {},
});

const getInitialState = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : defaultUser;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    if (localStorage !== undefined) {
      setUser(getInitialState);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
