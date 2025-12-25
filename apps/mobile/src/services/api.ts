export const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

export const apiFetch = async (path: string, token: string, options?: RequestInit) => {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options?.headers || {})
    }
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return response.json();
};
