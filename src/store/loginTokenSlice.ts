import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

interface LoginState {
  name: string;
  token: string;
  role: string;
}

const initialState: LoginState = {
  name: "",
  token: "",
  role: "",
};

const loginTokenSlice = createSlice({
  name: "loginToken",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginState>) => {
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.role = action.payload.role;
      // Set token cookie with same expiration as login API (120 days)
      Cookies.set('token', action.payload.token, { 
        expires: 120,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      }); 
      // Set role cookie for middleware authentication
      Cookies.set('role', action.payload.role, { 
        expires: 120,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      }); 
    },
    logout: (state) => {
      state.name = "";
      state.token = "";
      state.role = "";
      Cookies.remove('token', { path: '/' });
      Cookies.remove('role', { path: '/' });
      Cookies.remove('adminVerified', { path: '/' });
    },
  },
});

export const { login, logout } = loginTokenSlice.actions;
export default loginTokenSlice.reducer;