import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper to get the token (assuming you store it in localStorage or use Clerk)
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const adminService = {
  // Super Admin: Get all administrative users
  getAllAdmins: async () => {
    const response = await axios.get(`${API_URL}/admin/users`, getAuthHeader());
    return response.data;
  },

  // Super Admin: Update permissions for a specific admin
  updateAdminPermissions: async (adminId: string, permissions: string[]) => {
    const response = await axios.patch(
      `${API_URL}/admin/users/${adminId}/permissions`,
      { permissions },
      getAuthHeader(),
    );
    return response.data;
  },

  // Super Admin: Revoke access
  revokeAccess: async (adminId: string) => {
    const response = await axios.delete(
      `${API_URL}/admin/users/${adminId}`,
      getAuthHeader(),
    );
    return response.data;
  },

  // Dashboard Stats
  getSystemStats: async () => {
    const response = await axios.get(
      `${API_URL}/admin/dashboard/stats`,
      getAuthHeader(),
    );
    return response.data;
  },
};
