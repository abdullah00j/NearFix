import {
  useCurrentUserProfileQuery,
  useUserProfileImageUrl,
} from "@/data/userQueries";
import type { Schema } from "amplify/data/resource";
import { createContext, useContext, useState } from "react";

/* eslint-disable react-refresh/only-export-components */
type User = Pick<
  Schema["NearFixUser"]["type"],
  "id" | "name" | "email" | "profileImage" | "activeRole" | "language" | "theme"
>;

type role = "CUSTOMER" | "PROVIDER" | "ADMIN";

type UserContextValue = {
  currentUser: User | null;
  role: role[] | null;
  setRole: React.Dispatch<React.SetStateAction<role[] | null>>;
};

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const userQuery = useCurrentUserProfileQuery();
  const user = userQuery.data ?? null;
  const [role, setRole] = useState<role[] | null>(null);

  const profileImageQuery = useUserProfileImageUrl(
    user?.profileImage?.trim() ?? "",
  );
  const currentUser: User | null = user
    ? { ...user, profileImage: profileImageQuery.data ?? null }
    : null;

  return (
    <UserContext.Provider value={{ currentUser, role, setRole }}>
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
