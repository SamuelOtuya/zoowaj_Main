import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUserService, registerUserService } from "../services/authService";
import { setAuthToken } from "@/api/api";

interface authState {
  user: Record<string, any> | null;
  token: string | null;
  details: Record<string, any> | null;
  error: string | null;
  isLoading: boolean;
  login: boolean;
}

const initialState: authState = {
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
      .addCase(registerUserService.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(registerUserService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.login = true;
        setAuthToken(action.payload.token);
        AsyncStorage.setItem("bearerToken", action.payload.token);
        AsyncStorage.setItem("userData", JSON.stringify(action.payload.user));
      })
      .addCase(registerUserService.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload || "Registration failed";
      })

      // Login User
      .addCase(loginUserService.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(loginUserService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.login = true;
        setAuthToken(action.payload.token);
        AsyncStorage.setItem("bearerToken", action.payload.token);
        AsyncStorage.setItem("userData", JSON.stringify(action.payload.user));
      })
      .addCase(loginUserService.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { hydrateAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
