import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  authenticateToken,
  fetchAuthenticatedUserFormStorage,
  loginUser,
  registerUser,
} from "../services/authService";
import { UserData } from "@/constants/types";
import { User } from "@/constants/models/user.model";

interface AuthState {
  user: User | null;
  token: string | null;
  details: UserData | null;
  error: string | null;
  isLoading: boolean;
  login: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  details: null,
  isLoading: false,
  login: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuthState: (state, action) => {
      const { token, user, details } = action.payload;
      state.token = token;
      state.user = user || null;
      state.details = details;
      state.login = !!token;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.login = false;
      state.details = null;
    },
  },
  extraReducers: (builder) => {
    // Register User
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = User.fromJSON(action.payload.user);
        state.token = action.payload.token;
        state.login = true;
        AsyncStorage.setItem("bearerToken", action.payload.token);
        AsyncStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Registration failed";
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = User.fromJSON(action.payload.user);
        state.token = action.payload.token;
        state.login = true;
        AsyncStorage.setItem("bearerToken", action.payload.token);
        AsyncStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      })

      // Fetch stored user
      .addCase(fetchAuthenticatedUserFormStorage.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(fetchAuthenticatedUserFormStorage.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = User.fromJSON(action.payload);
          state.login = true;
        } else {
          state.user = null;
          state.login = false;
          state.error = "No authenticated user found";
        }
      })
      .addCase(fetchAuthenticatedUserFormStorage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Authentication failed";
      })

      // Authenticate user token
      .addCase(authenticateToken.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(authenticateToken.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = User.fromJSON(action.payload);
 // Assuming token is in payload
          AsyncStorage.setItem("user", JSON.stringify(action.payload));
          state.login = true;
        } else {
          state.login = false;
          state.error = "Invalid token";
        }
      })
      .addCase(authenticateToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Authentication failed";
      });
  },
});

export const { hydrateAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
