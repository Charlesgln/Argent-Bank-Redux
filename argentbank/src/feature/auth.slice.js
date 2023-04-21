import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: false,
    token: "",
  },
  reducers: {
    setAuth: (state, { payload }) => {
      state.auth = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
  },
});

export const { setAuth, setToken } = authSlice.actions;

export default authSlice.reducer;
