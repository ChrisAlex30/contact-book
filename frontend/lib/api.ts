import { config } from "./config";
import { getAccessToken } from "./auth";

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = await getAccessToken();

  const response = await fetch(`${config.apiUrl}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}