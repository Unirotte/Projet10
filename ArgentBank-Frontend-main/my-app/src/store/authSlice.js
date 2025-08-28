import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk pour le login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        credentials
      );
      return res.data; // { token: "..." }
    } catch (err) {
      // Normaliser l'erreur pour que error.message existe
      const message = err.response?.data?.message || "Erreur inconnue";
      return thunkAPI.rejectWithValue({ message });
    }
  }
);
const initialToken = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // { message: "..." }
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;