// store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ========================
// Async Thunks
// ========================

// LOGIN
// Envoie email + password à l’API pour récupérer un token
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/v1/user/login", {
        email,
        password,
      });

      const token = response.data.body.token;

      // On stocke le token dans le sessionStorage
      sessionStorage.setItem("token", token);

      return token; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// GET USER PROFILE
// Récupère les informations de l’utilisateur grâce au token
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.get("http://localhost:3001/api/v1/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.body; // { id, email, firstName, lastName }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// UPDATE USER NAME
export const updateUserName = createAsyncThunk(
  "auth/updateUserName",
  async (newUserName, { getState }) => {
    const token = getState().auth.token;
    const res = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userName: newUserName }),
    });
    const data = await res.json();
    return data.body;
  }
);

// ========================
// Auth Slice
// ========================
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: sessionStorage.getItem("token") || null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // -------- LOGIN --------
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // -------- GET USER PROFILE --------
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // -------- UPDATE USER NAME --------
    builder.addCase(updateUserName.fulfilled, (state, action) => {
      if (state.user) {
        state.user.userName = action.payload.userName;
      }
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
