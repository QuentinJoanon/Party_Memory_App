import React, { createContext, useContext, useState, ReactNode } from "react";

export interface IUser {
  email: string | null;
  emailVerified: boolean;
  uid: string;
}

export interface IUserData {
  firstName: string;
  lastName: string;
  subscriptionLevel: string;
  events: string[];
}

export type UserContextType = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  userData: IUserData | null;
  setUserData: React.Dispatch<React.SetStateAction<IUserData | null>>;
  isAuthed: boolean;
};

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  userData: null,
  setUserData: () => {},
  isAuthed: false,
});

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [userData, setUserData] = useState<IUserData | null>(null);
  const isAuthed = user !== null;

  return (
    <UserContext.Provider
      value={{ user, setUser, userData, setUserData, isAuthed }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
