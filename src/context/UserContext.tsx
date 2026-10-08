import { createContext, useContext, useState } from "react";

/* eslint-disable react-refresh/only-export-components */
export type CurrentUserProfile = {
  id: string;
  name: string;
  email: string;
  profileImage: string;
};
type role = "CUSTOMER" | "PROVIDER" | "ADMIN";

type UserContextValue = {
  currentUser: CurrentUserProfile | null;
  setCurrentUser: React.Dispatch<
    React.SetStateAction<CurrentUserProfile | null>
  >;
  role: role[] | null;
  setRole: React.Dispatch<React.SetStateAction<role[] | null>>;
};

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserProfile | null>(
    null,
  );
  const [role, setRole] = useState<role[] | null>(null);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, role, setRole }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within a UserProvider");
  }
  return context;
};
