import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Developer } from './api';

interface AuthState {
  developer: Developer | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  developer: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ developer: Developer; accessToken: string; refreshToken: string }>
    ) => {
      state.developer = action.payload.developer;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      // Store in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', action.payload.accessToken);
        localStorage.setItem('refresh_token', action.payload.refreshToken);
      }
    },
    logout: (state) => {
      state.developer = null;
      state.accessToken = null;
      state.refreshToken = null;

      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
