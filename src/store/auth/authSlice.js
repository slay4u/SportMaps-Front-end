import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { email: null, token: null, role: null },
  reducers: {
    setCredentials: (state, action) => {
      const { email, authenticationToken, role } = action.payload;
      state.email = email;
      state.token = authenticationToken;
      state.role = role;
    },
    logOut: (state, action) => {
      state.email = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentEmail = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRole = (state) => state.auth.role;
