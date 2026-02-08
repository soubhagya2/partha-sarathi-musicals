import { useEffect, useState, type ReactNode } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoadingRole, setIsLoadingRole] = useState(true);
  const superAdminEmail = import.meta.env.VITE_SUPER_ADMIN_EMAIL;

  useEffect(() => {
    let isMounted = true;

    const loadRole = async () => {
      if (!isSignedIn) {
        if (isMounted) {
          setUserRole(null);
          setIsLoadingRole(false);
        }
        return;
      }

      try {
        const token = await getToken();
        if (!token) {
          if (isMounted) {
            setUserRole(null);
            setIsLoadingRole(false);
          }
          return;
        }

        const apiUrl =
          import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${apiUrl}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          if (isMounted) {
            setUserRole(null);
            setIsLoadingRole(false);
          }
          return;
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

    setIsLoadingRole(true);
    loadRole();

    return () => {
      isMounted = false;
    };
  }, [getToken, isSignedIn]);

  if (!isLoaded || isLoadingRole) {
    return null;
  }

  if (!isSignedIn) {
    // Redirect to the specific login page based on the path
    const loginPath = location.pathname.startsWith("/super-admin")
      ? "/super-admin/login"
      : "/admin/login";
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  // Fallback: if role lookup fails but this is the configured Super Admin account,
  // still allow access to super-admin routes.
  const isSuperAdminRoute = location.pathname.startsWith("/super-admin");
  const currentEmail =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress;

  if (
    (!userRole || !allowedRoles.includes(userRole)) &&
    !(
      isSuperAdminRoute &&
      superAdminEmail &&
      currentEmail &&
      currentEmail.toLowerCase() === superAdminEmail.toLowerCase()
    )
  ) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
