import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();

  // This should be replaced with your actual auth state (e.g., from Clerk or Redux)
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAuthenticated = !!user;
  const userRole = user?.role;

  if (!isAuthenticated) {
    // Redirect to the specific login page based on the path
    const loginPath = location.pathname.startsWith("/super-admin")
      ? "/super-admin/login"
      : "/admin/login";
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
