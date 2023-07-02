import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { email: null, token: null, role: null, refreshToken: null },
  reducers: {
    setCredentials: (state, action) => {
      const { email, authenticationToken, role, refreshToken } = action.payload;
      state.email = email;
      state.token = authenticationToken;
      state.role = role;
      state.refreshToken = refreshToken
    },
    logOut: (state) => {
      state.email = null;
      state.token = null;
      state.role = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentEmail = (state: { auth: { email: never; }; }) => state.auth.email;
export const selectCurrentToken = (state: { auth: { token: never; }; }) => state.auth.token;
export const selectCurrentRole = (state: { auth: { role: never; }; }) => state.auth.role;
export const selectCurrentRefreshToken = (state: { auth: { refreshToken: never; }; }) => state.auth.refreshToken;
