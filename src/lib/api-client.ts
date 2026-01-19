import { ApiResponse } from '@/types/api';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  requiresAuth?: boolean;
}

// Helper to get tokens
const getAccessToken = () => Cookies.get('access_token');
const getRefreshToken = () => Cookies.get('refresh_token');

// Helper to set tokens
export const setTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set('access_token', accessToken);
  Cookies.set('refresh_token', refreshToken);
};

export const clearTokens = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
};

async function apiClient<T>(
  endpoint: string,
  method: RequestMethod = 'GET',
  { params, requiresAuth = true, headers, ...customConfig }: FetchOptions = {}
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...customConfig,
  };

  if (requiresAuth) {
    const token = getAccessToken();
    if (token) {
      (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }

  let response = await fetch(url.toString(), config);

  // Handle 401 Unauthorized (Refresh Token Logic)
  if (response.status === 401 && requiresAuth) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        // Try to refresh the token
        const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          // Assuming the structure is standard ApiResponse with data containing new tokens
          // Adjust based on actual refresh response structure if different
          const newAccessToken = data.data?.access_token; 
          // If the backend returns a new refresh token, update it too
          const newRefreshToken = data.data?.refresh_token || refreshToken;

          if (newAccessToken) {
            setTokens(newAccessToken, newRefreshToken);
             // Retry the original request with new token
            (config.headers as Record<string, string>)['Authorization'] = `Bearer ${newAccessToken}`;
            response = await fetch(url.toString(), config);
          } else {
             clearTokens();
             window.location.href = '/login'; // Redirect to login
          }
        } else {
          clearTokens();
           window.location.href = '/login';
        }
      } catch (error) {
        clearTokens();
        window.location.href = '/login';
      }
    } else {
       // No refresh token available
       // Optional: Redirect to login or just let it fail
    }
  }

  // Handle generic errors
  if (!response.ok) {
    let errorMessage = 'Something went wrong';
    let errorData = null;
    try {
      const errorBody = await response.json();
      errorMessage = errorBody.message || errorMessage;
      errorData = errorBody;
    } catch {
      // ignore JSON parse error
    }
    throw new ApiError(response.status, errorMessage, errorData);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  const responseBody = await response.json();
  
  // Unwrap generic Response wrapper if present, or return raw
  // The Swagger defines many responses as `ApiResponse` wrapper.
  // We can choose to return the full wrapper or just the data.
  // For convenience, let's return the full wrapper for now so the caller checks .status if needed,
  // or we can unwrap here. 
  // Given the requirement for generic error handling, unwrapping `data` IF strict structure exists is good,
  // but let's return the body as T for maximum flexibility unless specific standard prevails.
  return responseBody as T;
}

export const api = {
  get: <T>(endpoint: string, options?: FetchOptions) => 
    apiClient<T>(endpoint, 'GET', options),
  post: <T>(endpoint: string, body?: any, options?: FetchOptions) => 
    apiClient<T>(endpoint, 'POST', { ...options, body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body?: any, options?: FetchOptions) => 
    apiClient<T>(endpoint, 'PUT', { ...options, body: JSON.stringify(body) }),
  patch: <T>(endpoint: string, body?: any, options?: FetchOptions) => 
    apiClient<T>(endpoint, 'PATCH', { ...options, body: JSON.stringify(body) }),
  delete: <T>(endpoint: string, options?: FetchOptions) => 
    apiClient<T>(endpoint, 'DELETE', options),
};
