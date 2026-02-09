import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include cookies in requests
});

let refreshTokenInProgress = false;
let refreshTokenPromise: Promise<boolean> | null = null;

// Silent token refresh handler
const performSilentRefresh = async (): Promise<boolean> => {
  if (refreshTokenInProgress) {
    // Wait for ongoing refresh to complete
    return refreshTokenPromise || Promise.resolve(false);
  }

  refreshTokenInProgress = true;
  refreshTokenPromise = (async () => {
    try {
      const response = await api.post(
        "/auth/refresh",
        {},
        { withCredentials: true },
      );
      return response.status === 200;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    } finally {
      refreshTokenInProgress = false;
      refreshTokenPromise = null;
    }
  })();

  return refreshTokenPromise;
};

// Request interceptor - credentials are included automatically
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Ensure credentials are included (already set in config above)
  return config;
});

// Response interceptor - handle 401 and retry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized - attempt silent refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshed = await performSilentRefresh();
      if (refreshed) {
        // Retry the original request after token refresh
        return api(originalRequest);
      } else {
        // Refresh failed, redirect to login
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export const adminService = {
  // Super Admin: Get all administrative users
  getAllAdmins: async () => {
    const response = await api.get("/users");
    return response.data.data || response.data;
  },

  // Super Admin: Update permissions for a specific admin
  updateAdminPermissions: async (adminId: string, permissions: string[]) => {
    const response = await api.patch(`/users/${adminId}/permissions`, {
      permissions,
    });
    return response.data;
  },

  // Super Admin: Revoke access
  revokeAccess: async (adminId: string) => {
    const response = await api.delete(`/users/${adminId}`);
    return response.data;
  },

  // Dashboard Stats
  getSystemStats: async () => {
    const response = await api.get("/admin/dashboard/stats");
    return response.data.data || response.data;
  },

  // Product Management
  getProducts: async () => {
    const response = await api.get("/products");
    return response.data.data || response.data;
  },

  // Support Management
  getTickets: async () => {
    const response = await api.get("/support-tickets");
    return response.data.data || response.data;
  },
};
