import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLogin = createAsyncThunk(
  "user/userLogin",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        {
          email: `${username}`,
          password: `${password}`,
        }
      );
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue("Erreur de connexion");
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Erreur de connexion");
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogin.fulfilled, (state) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default loginSlice.reducer;
