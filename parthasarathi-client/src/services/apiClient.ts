/**
 * Simple API client that uses HttpOnly cookie authentication.
 * All requests send credentials so the backend can read cookies.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

interface FetchOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  query?: Record<string, string | number | boolean>;
}

const request = async <T = any>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> => {
  const { body, query, ...fetchOptions } = options;

  let url = `${API_BASE_URL}${endpoint}`;
  if (query) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, val]) =>
      params.append(key, String(val)),
    );
    url += `?${params.toString()}`;
  }

  const merged: RequestInit = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(fetchOptions.headers || {}),
    },
    ...fetchOptions,
  };

  if (body) merged.body = JSON.stringify(body);

  const res = await fetch(url, merged);
  if (res.status === 401) throw new Error("Unauthorized");
  if (res.status === 403) throw new Error("Forbidden");
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || res.statusText);
  }
  return (await res.json()) as T;
};

export const useApiClient = () => {
  return {
    get: <T = any>(endpoint: string, options?: Omit<FetchOptions, "method">) =>
      request<T>(endpoint, { ...options, method: "GET" }),
    post: <T = any>(
      endpoint: string,
      body?: unknown,
      options?: Omit<FetchOptions, "method" | "body">,
    ) => request<T>(endpoint, { ...options, method: "POST", body }),
    put: <T = any>(
      endpoint: string,
      body?: unknown,
      options?: Omit<FetchOptions, "method" | "body">,
    ) => request<T>(endpoint, { ...options, method: "PUT", body }),
    delete: <T = any>(
      endpoint: string,
      options?: Omit<FetchOptions, "method">,
    ) => request<T>(endpoint, { ...options, method: "DELETE" }),
    patch: <T = any>(
      endpoint: string,
      body?: unknown,
      options?: Omit<FetchOptions, "method" | "body">,
    ) => request<T>(endpoint, { ...options, method: "PATCH", body }),
  };
};

export default useApiClient;
