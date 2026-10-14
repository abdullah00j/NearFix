import { useGetUser } from "@/hooks/usegetUser";
import type { Schema } from "amplify/data/resource";
import { createContext, useContext, useState } from "react";

/* eslint-disable react-refresh/only-export-components */
type User = Pick<
  Schema["NearFixUser"]["type"],
  "id" | "name" | "email" | "profileImage" | "activeRole"
>;

type role = "CUSTOMER" | "PROVIDER" | "ADMIN";

type UserContextValue = {
  currentUser: User | null;
  role: role[] | null;
  setRole: React.Dispatch<React.SetStateAction<role[] | null>>;
};

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useGetUser();
  const [role, setRole] = useState<role[] | null>(null);

  return (
    <UserContext.Provider value={{ currentUser: user, role, setRole }}>
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
