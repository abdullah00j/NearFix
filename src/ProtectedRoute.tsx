import { fetchAuthSession } from "aws-amplify/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";
type groupRole = Role[];

interface ProtectedRouteProps {
  allowedRoles: Role[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [group, setGroup] = useState<groupRole>([]);
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { tokens } = await fetchAuthSession();
        const groups = tokens?.idToken?.payload["cognito:groups"];
        const validGroups: Role[] = Array.isArray(groups)
          ? groups.filter(
              (role): role is Role =>
                role === "CUSTOMER" || role === "PROVIDER" || role === "ADMIN",
            )
          : [];
        setGroup(validGroups);
        console.log(validGroups);

        setIsAuthenticated(!!tokens);
      } catch (error) {
        console.log("No active session", error);
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (location.pathname === "/login" && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!group.some((role) => allowedRoles.includes(role))) {
    return <Navigate to="/" replace />;
  }

  // Logged in + correct role
  return <Outlet />;
};

export default ProtectedRoute;
