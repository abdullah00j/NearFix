import { fetchAuthSession } from "aws-amplify/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./component/common/Loader";
import { useCurrentUser } from "./context/UserContext";

type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";

interface ProtectedRouteProps {
  allowedRoles: Role[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const { role, setRole } = useCurrentUser();
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { tokens } = await fetchAuthSession();
        if (!tokens) {
          setIsAuthenticated(false);
          return;
        }

        const groups = tokens?.idToken?.payload["cognito:groups"];
        const validGroups: Role[] = Array.isArray(groups)
          ? groups.filter(
              (group): group is Role =>
                group === "CUSTOMER" ||
                group === "PROVIDER" ||
                group === "ADMIN",
            )
          : [];
        setRole(validGroups);
        console.log(validGroups);

        setIsAuthenticated(!!tokens);
      } catch (error) {
        console.log("No active session", error);
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, [setRole]);

  if (isAuthenticated === null) {
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

  if (!role?.some((roles) => allowedRoles.includes(roles))) {
    return <Navigate to="/" replace />;
  }

  // Logged in + correct role
  return <Outlet />;
};

export default ProtectedRoute;
