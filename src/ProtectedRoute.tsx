import { Navigate, Outlet } from "react-router-dom";

type Role = "USER" | "PROVIDER" | "ADMIN";

interface ProtectedRouteProps {
  allowedRoles: Role[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  // TEMPORARY:
  // Later get this from your Cognito/Amplify user + database profile
  const userRole: Role = "PROVIDER";

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
