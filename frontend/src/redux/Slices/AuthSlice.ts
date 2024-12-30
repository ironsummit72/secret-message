import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface AuthState {
  isUserauthenticated: boolean;
  userData: { user: string } | null;
}

const initialState: AuthState = {
  isUserauthenticated: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isUserauthenticated = true;
      state.userData = action.payload;
    },
    logout: (state) => {
        state.isUserauthenticated = false;
        state.userData = null;
    },
  },
});
export const { login, logout } = authSlice.actions;
export const selectCount = (state: RootState) => state.auth;
export default authSlice.reducer;
