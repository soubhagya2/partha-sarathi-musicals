import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();

  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoadingRole, setIsLoadingRole] = useState(true);

  const superAdminEmail = import.meta.env.VITE_SUPER_ADMIN_EMAIL;

  const token = localStorage.getItem("token"); // 🔥 your JWT token

  useEffect(() => {
    let isMounted = true;

    const loadRole = async () => {
      if (!token) {
        if (isMounted) {
          setUserRole(null);
          setIsLoadingRole(false);
        }
        return;
      }

      try {
        const apiUrl =
          import.meta.env.VITE_API_URL || "http://localhost:5000/api";

        const response = await fetch(`${apiUrl}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const data = await response.json();

        if (isMounted) {
          setUserRole(data?.user?.role ?? null);
          setIsLoadingRole(false);
        }
      } catch {
        if (isMounted) {
          setUserRole(null);
          setIsLoadingRole(false);
        }
      }
    };

    loadRole();

    return () => {
      isMounted = false;
    };
  }, [token]);

  // 🔥 Loading state
  if (isLoadingRole) {
    return <div>Loading...</div>;
  }

  // 🔥 Not logged in
  if (!token) {
    const loginPath = location.pathname.startsWith("/super-admin")
      ? "/super-admin/login"
      : "/admin/login";

    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  const isSuperAdminRoute = location.pathname.startsWith("/super-admin");

  // 🔥 OPTIONAL: if your API returns email
  const currentEmail = localStorage.getItem("email");

  const isSuperAdmin =
    isSuperAdminRoute &&
    superAdminEmail &&
    currentEmail &&
    currentEmail.toLowerCase() === superAdminEmail.toLowerCase();

  // 🔥 Role check
  if (!userRole || (!allowedRoles.includes(userRole) && !isSuperAdmin)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;