import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

const getClerkToken = async () => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return await window.Clerk?.session?.getToken();
  } catch {
    return null;
  }
};

// Automatically attach the Clerk token to every request
api.interceptors.request.use(async (config) => {
  const token = await getClerkToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminService = {
  // Super Admin: Get all administrative users
  getAllAdmins: async () => {
    const response = await api.get("/admin/users");
    return response.data;
  },

  // Super Admin: Update permissions for a specific admin
  updateAdminPermissions: async (adminId: string, permissions: string[]) => {
    const response = await api.patch(`/admin/users/${adminId}/permissions`, {
      permissions,
    });
    return response.data;
  },

  // Super Admin: Revoke access
  revokeAccess: async (adminId: string) => {
    const response = await api.delete(`/admin/users/${adminId}`);
    return response.data;
  },

  // Dashboard Stats
  getSystemStats: async () => {
    const response = await api.get("/admin/dashboard/stats");
    return response.data;
  },

  // Product Management
  getProducts: async () => {
    const response = await api.get("/products");
    return response.data;
  },

  // Support Management
  getTickets: async () => {
    const response = await api.get("/admin/tickets");
    return response.data;
  },
};
