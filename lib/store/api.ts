import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Developer {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
}

export interface AuthResponse {
  message: string;
  email: string;
}

export interface APIKey {
  id: string;
  key: string;
  key_prefix: string;
  name: string;
  description?: string;
  developer_id: string;
  workspace_id?: string;
  permissions: string[];
  rate_limit_tier: string;
  is_active: boolean;
  last_used_at?: string;
  created_at: string;
}

export interface CreateAPIKeyRequest {
  name: string;
  description?: string;
  permissions?: string[];
  rate_limit_tier?: string;
}

export interface UsageLog {
  id: string;
  api_key_id: string;
  endpoint: string;
  method: string;
  status_code: number;
  response_time_ms?: number;
  created_at: string;
}

// Create the base API
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://sdk-gateway.urisocial.com',
    credentials: 'include', // Include cookies in requests
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Developer', 'APIKey', 'Usage'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (data) => ({
        url: '/api/v1/auth/signup',
        method: 'POST',
        body: data,
      }),
    }),

    // Developer endpoints
    getCurrentDeveloper: builder.query<Developer, void>({
      query: () => '/api/v1/auth/me',
      providesTags: ['Developer'],
    }),

    // API Keys endpoints
    getAPIKeys: builder.query<APIKey[], void>({
      query: () => '/api/v1/api-keys',
      providesTags: ['APIKey'],
    }),
    createAPIKey: builder.mutation<APIKey, CreateAPIKeyRequest>({
      query: (data) => ({
        url: '/api/v1/api-keys',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['APIKey'],
    }),
    deleteAPIKey: builder.mutation<void, string>({
      query: (keyId) => ({
        url: `/api/v1/api-keys/${keyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['APIKey'],
    }),

    // Usage endpoints
    getUsage: builder.query<UsageLog[], { limit?: number; offset?: number }>({
      query: ({ limit = 100, offset = 0 }) => `/api/v1/usage?limit=${limit}&offset=${offset}`,
      providesTags: ['Usage'],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetCurrentDeveloperQuery,
  useGetAPIKeysQuery,
  useCreateAPIKeyMutation,
  useDeleteAPIKeyMutation,
  useGetUsageQuery,
} = apiSlice;
