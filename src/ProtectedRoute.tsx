import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./components/common/Loader";
import { useCurrentUser } from "./context/UserContext";
import { getCurrentAuthSession } from "@/data/userServices";

type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";

interface ProtectedRouteProps {
  allowedRoles: Role[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const { role, setRole, currentUser } = useCurrentUser();
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getCurrentAuthSession();
        if (!session.authenticated) {
          setIsAuthenticated(false);
          return;
        }
        const validGroups: Role[] = session.groups.filter(
          (group): group is Role =>
            group === "CUSTOMER" || group === "PROVIDER" || group === "ADMIN",
        );

        if (currentUser) {
          const activeRole = currentUser.activeRole;
          setRole(activeRole ? [activeRole] : validGroups);
        }
        setIsAuthenticated(session.authenticated);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, [setRole, currentUser?.id, currentUser?.activeRole]);
  if (isAuthenticated === null || (isAuthenticated && role === null)) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader label="Checking your session..." />
      </div>
    );
  }

  if (location.pathname === "/login" && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!role?.some((userRole) => allowedRoles.includes(userRole))) {
    const homePath = role?.includes("ADMIN")
      ? "/admin"
      : role?.includes("PROVIDER")
        ? "/provider"
        : role?.includes("CUSTOMER")
          ? "/"
          : "/login";
    return <Navigate to={homePath} replace />;
  }

  // Logged in + correct role
  return <Outlet />;
};

export default ProtectedRoute;
