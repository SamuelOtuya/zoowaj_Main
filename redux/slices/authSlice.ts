import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUserService, registerUserService } from "../services/authService";

const initialState = {
  isloading: false,
  login: false,
  details: false,
  user: {},
  token: null,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuthState: (state, action) => {
      const { token, user, details } = action.payload;
      state.token = token;
      state.user = user;
      state.details = details;
      state.login = !!token;
    },
    logout: (state) => {
      state.token = null;
      state.user = {};
      state.details = false;
      state.login = false;
    },
  },
  extraReducers: (builder) => {
    // Register User
    builder
      .addCase(registerUserService.pending, (state) => {
        state.isloading = true;
        state.error = "";
      })
      .addCase(registerUserService.fulfilled, (state, action) => {
        state.isloading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.login = true;
        AsyncStorage.setItem("bearerToken", action.payload.token);
        AsyncStorage.setItem("userData", JSON.stringify(action.payload.user));
      })
      .addCase(registerUserService.rejected, (state, action: any) => {
        state.isloading = false;
        state.error = action.payload || "Registration failed";
      })

      // Login User
      .addCase(loginUserService.pending, (state) => {
        state.isloading = true;
        state.error = "";
      })
      .addCase(loginUserService.fulfilled, (state, action) => {
        state.isloading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.login = true;
        AsyncStorage.setItem("bearerToken", action.payload.token);
        AsyncStorage.setItem("userData", JSON.stringify(action.payload.user));
      })
      .addCase(loginUserService.rejected, (state, action: any) => {
        state.isloading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { hydrateAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
