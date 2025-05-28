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
      Cookies.set('token', action.payload.token, { expires: 1 }); 
    },
    logout: (state) => {
      state.name = "";
      state.token = "";
      state.role = "";
      Cookies.remove('token');
    },
  },
});

export const { login, logout } = loginTokenSlice.actions;
export default loginTokenSlice.reducer;