import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Developer } from './api';

interface AuthState {
  developer: Developer | null;
}

const initialState: AuthState = {
  developer: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ developer: Developer }>
    ) => {
      state.developer = action.payload.developer;
      // Tokens are stored in HttpOnly cookies by the server
    },
    logout: (state) => {
      state.developer = null;
      // Cookies will be cleared by the logout API call
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
