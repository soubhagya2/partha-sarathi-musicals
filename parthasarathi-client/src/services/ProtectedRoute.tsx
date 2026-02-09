import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectTo = "/login",
}: ProtectedRouteProps) => {
  const location = useLocation();
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const auth = useAuthContext();

  useEffect(() => {
    // Wait for our AuthContext to finish initial load
    if (!auth) return;
    if (!auth.isLoaded) return;

    setIsAuthenticated(!!auth.user);
    setUserRole(auth.user?.role || null);
    setIsLoadingAuth(false);
  }, [auth]);

  if (isLoadingAuth) return null;

  if (!isAuthenticated) {
    const loginPath = location.pathname.startsWith("/super-admin")
      ? "/super-admin/login"
      : location.pathname.startsWith("/admin")
        ? "/admin/login"
        : redirectTo;
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!userRole)
      return <Navigate to={redirectTo} state={{ from: location }} replace />;
    if (!allowedRoles.includes(userRole)) {
      if (userRole === "SUPER_ADMIN")
        return <Navigate to="/super-admin/dashboard" replace />;
      if (userRole === "ADMIN")
        return <Navigate to="/admin/dashboard" replace />;
      if (userRole === "SUPPORT")
        return <Navigate to="/support/dashboard" replace />;
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
