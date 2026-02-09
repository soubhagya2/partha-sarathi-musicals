import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "SUPPORT" | "CUSTOMER";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  imageUrl?: string;
  isActive: boolean;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  // Compatibility with prior Clerk-based API
  isLoaded?: boolean;
  isSignedIn?: boolean;
  role?: UserRole | undefined;
  // Auth methods
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  verifyEmail: (email: string, otp: string) => Promise<void>;
  resendEmailVerificationOTP: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (
    email: string,
    otp: string,
    newPassword: string,
  ) => Promise<void>;
  resendPasswordResetOTP: (email: string) => Promise<void>;
  googleOAuthCallback: (googleData: any) => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshInProgress, setRefreshInProgress] = useState(false);
  const [refreshFailed, setRefreshFailed] = useState(false);

  const clearError = useCallback(() => setError(null), []);

  const attemptSilentRefresh = useCallback(async (): Promise<string | null> => {
    if (refreshInProgress) return null;
    if (refreshFailed) return null;

    try {
      setRefreshInProgress(true);
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        setRefreshFailed(true);
        return null;
      }
      try {
        const data = await response.json();
        const newToken = data?.data?.accessToken;
        if (newToken) {
          setAccessToken(newToken);
          return newToken;
        }
      } catch {
        // fallthrough
      }
      setRefreshFailed(true);
      return null;
    } catch (err) {
      console.error("Token refresh failed:", err);
      setRefreshFailed(true);
      return null;
    } finally {
      setRefreshInProgress(false);
    }
  }, [refreshInProgress, refreshFailed]);

  const fetchUserProfile = useCallback(
    async (token?: string) => {
      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        const tokenToUse = token || accessToken;
        if (tokenToUse) headers["Authorization"] = `Bearer ${tokenToUse}`;

        const response = await fetch("/api/users/me", {
          headers,
          credentials: "include",
        });

        if (response.status === 401) {
          // Token expired, attempt silent refresh
          const newToken = await attemptSilentRefresh();
          if (newToken) {
            // Retry profile fetch after refresh with new token
            const retryHeaders: Record<string, string> = {
              "Content-Type": "application/json",
            };
            if (newToken) retryHeaders["Authorization"] = `Bearer ${newToken}`;

            const retryResponse = await fetch("/api/users/me", {
              headers: retryHeaders,
              credentials: "include",
            });
            if (retryResponse.ok) {
              try {
                const data = await retryResponse.json();
                setUser(data.data || data.user);
                setError(null);
              } catch (parseErr) {
                const text = await retryResponse
                  .text()
                  .catch(() => "<unreadable body>");
                console.error("Auth retry: expected JSON but received:", text);
                setUser(null);
                setError("Failed to parse user profile response after refresh");
              }
            } else {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        } else if (response.ok) {
          try {
            const data = await response.json();
            setUser(data.data || data.user);
            setError(null);
          } catch (parseErr) {
            const text = await response.text().catch(() => "<unreadable body>");
            console.error("Auth check: expected JSON but received:", text);
            setUser(null);
            setError("Failed to parse user profile response");
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
        setError("Failed to load user profile");
      } finally {
        setIsLoading(false);
        setIsLoaded(true);
      }
    },
    [accessToken, attemptSilentRefresh],
  );

  // Check authentication on app load
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const login = async (credentials: { email: string; password: string }) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Login failed");
      }

      // parse accessToken from login response and save it
      let token: string | null = null;
      try {
        const body = await response.json();
        token = body?.data?.accessToken || null;
        if (token) setAccessToken(token);
      } catch {
        // ignore parse errors
      }

      // Fetch user profile with the new token
      await fetchUserProfile(token || undefined);
    } catch (err: any) {
      const msg = err.message || "Login failed";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
    } catch (err: any) {
      const msg = err.message || "Registration failed";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (email: string, otp: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Email verification failed");
      }
      await fetchUserProfile();
    } catch (err: any) {
      const msg = err.message || "Email verification failed";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resendEmailVerificationOTP = async (email: string) => {
    setError(null);
    try {
      const response = await fetch("/api/auth/resend-email-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to resend verification email",
        );
      }
    } catch (err: any) {
      const msg = err.message || "Failed to resend verification email";
      setError(msg);
      throw err;
    }
  };

  const forgotPassword = async (email: string) => {
    setError(null);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to send password reset email",
        );
      }
    } catch (err: any) {
      const msg = err.message || "Failed to send password reset email";
      setError(msg);
      throw err;
    }
  };

  const resetPassword = async (
    email: string,
    otp: string,
    newPassword: string,
  ) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Password reset failed");
      }
    } catch (err: any) {
      const msg = err.message || "Password reset failed";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resendPasswordResetOTP = async (email: string) => {
    setError(null);
    try {
      const response = await fetch("/api/auth/resend-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to resend password reset email",
        );
      }
    } catch (err: any) {
      const msg = err.message || "Failed to resend password reset email";
      setError(msg);
      throw err;
    }
  };

  const googleOAuthCallback = async (googleData: any) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(googleData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Google login failed");
      }

      await fetchUserProfile();
    } catch (err: any) {
      const msg = err.message || "Google login failed";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setError(null);
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    // Compatibility with previous Clerk-based hooks
    isLoaded,
    isSignedIn: !!user,
    role: user?.role,
    // Auth methods
    login,
    logout,
    register,
    verifyEmail,
    resendEmailVerificationOTP,
    forgotPassword,
    resetPassword,
    resendPasswordResetOTP,
    googleOAuthCallback,
    refreshUser: fetchUserProfile,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Legacy support for existing components
export const useAuthContext = useAuth;
