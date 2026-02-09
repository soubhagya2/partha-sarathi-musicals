import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Axios instance configured to use cookie-based auth (HttpOnly cookies).
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000,
});

// Simple response interceptor to surface common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Authentication required - session may be expired");
    }
    return Promise.reject(error);
  },
);

// ===== User Interface =====

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "SUPER_ADMIN" | "ADMIN" | "SUPPORT" | "CUSTOMER";
  avatar?: string;
  isActive: boolean;
  isBlocked: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProfileResponse {
  success: boolean;
  message?: string;
  user?: User;
  code?: string;
}

export interface UserListResponse {
  success: boolean;
  data: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  message?: string;
  code?: string;
}

// ===== API Endpoints =====

/**
 * Get authenticated user's profile from MongoDB
 * User must be authenticated via JWT
 */
export const getUserProfile = async (): Promise<{
  success: boolean;
  user: User;
}> => {
  try {
    const response = await api.get<{ success: boolean; user: User }>(
      "/users/profile",
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to get user profile:", error);
    throw error;
  }
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (): Promise<{
  success: boolean;
  user: User;
}> => {
  try {
    const response = await api.get<{ success: boolean; user: User }>(
      "/users/me",
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to get current user:", error);
    throw error;
  }
};

/**
 * Update user role (Admin only)
 */
export const updateUserRole = async (
  userId: string,
  role: string,
): Promise<ProfileResponse> => {
  try {
    const response = await api.post<ProfileResponse>(`/users/${userId}/role`, {
      userId,
      role,
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to update user role:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update user role",
      code: error.response?.data?.code,
    };
  }
};

/**
 * Block or unblock user (Admin only)
 */
export const toggleUserBlock = async (
  userId: string,
  isBlocked: boolean,
): Promise<ProfileResponse> => {
  try {
    const response = await api.post<ProfileResponse>(`/users/${userId}/block`, {
      userId,
      isBlocked,
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to toggle user block status:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update user status",
      code: error.response?.data?.code,
    };
  }
};

/**
 * Get all users with filtering (Admin only)
 */
export const getAllUsers = async (filters?: {
  role?: string;
  isActive?: boolean;
  isBlocked?: boolean;
  page?: number;
  limit?: number;
}): Promise<UserListResponse> => {
  try {
    const response = await api.get<UserListResponse>("/users", {
      params: filters,
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch users:", error);
    return {
      success: false,
      data: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        pages: 0,
      },
      message: error.response?.data?.message || "Failed to fetch users",
      code: error.response?.data?.code,
    };
  }
};

export default api;
