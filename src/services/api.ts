const BASE_URL = "https://bloodlink-backend-3179.onrender.com/api";

interface ApiOptions {
  headers?: Record<string, string>;
}

async function request<T>(
  method: string,
  endpoint: string,
  data?: unknown,
  options?: ApiOptions,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...(data !== undefined ? { body: JSON.stringify(data) } : {}),
  });

  const text = await response.text();

  let result: unknown;

  try {
    result = text ? JSON.parse(text) : null;
  } catch {
    result = text;
  }

  if (!response.ok) {
    const errorData = result as {
      message?: string;
      error?: string;
    } | null;

    throw new Error(
      errorData?.message ||
        errorData?.error ||
        `Request failed with status ${response.status}`,
    );
  }

  return result as T;
}

export const api = {
  get: <T>(endpoint: string, options?: ApiOptions) =>
    request<T>("GET", endpoint, undefined, options),

  post: <T>(endpoint: string, data?: unknown, options?: ApiOptions) =>
    request<T>("POST", endpoint, data, options),

  put: <T>(endpoint: string, data?: unknown, options?: ApiOptions) =>
    request<T>("PUT", endpoint, data, options),

  patch: <T>(endpoint: string, data?: unknown, options?: ApiOptions) =>
    request<T>("PATCH", endpoint, data, options),

  delete: <T>(endpoint: string, options?: ApiOptions) =>
    request<T>("DELETE", endpoint, undefined, options),
};
