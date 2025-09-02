// store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

// Requête de connexion
// On envoie email + password à l’API pour récupérer un token
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/v1/user/login", {
        email,
        password,
      });

      // L’API renvoie : { status, message, body: { token } }
      const token = response.data.body.token;

      // On stocke le token dans le localStorage pour garder la session
      localStorage.setItem("token", token);

      return token; // On renvoie le token pour le mettre dans Redux
    } catch (error) {

      return rejectWithValue(error.response.data);
    }
  }
);


// Requête Profil utilisateur

// On récupère les infos de l’utilisateur grâce au token
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // On récupère le token dans Redux

      const response = await axios.get("http://localhost:3001/api/v1/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // On envoie le token dans le header
        },
      });
      
      return response.data.body; // { id, email, firstName, lastName }
    } catch (error) {
      
      return rejectWithValue(error.response.data);
    }
  }
);

// ========================
// 3️⃣ Slice Auth
// ========================
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null, // Vérifie si déjà connecté
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Déconnexion → on supprime le token
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload; // on stocke le token
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // message d’erreur
    });

    // GET USER PROFILE
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload; // on stocke les infos de l’utilisateur
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
      builder.addCase(updateUserName.fulfilled, (state, action) => {
      if (state.user) {
        state.user.userName = action.payload.userName; // Met à jour seulement le pseudo
      }
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
