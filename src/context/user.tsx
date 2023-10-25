import React, { createContext, useContext, useState, ReactNode } from "react";

export interface IUser {
  email: string | null;
}

export type UserContextType = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
