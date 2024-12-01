import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUserService, registerUserService, updateProfileDetailsService } from "../services/authservice";

const initialState = {
  isloading: false,
  login: false,
  details: false,
  user: {},
  token: null,
  error: "",
};

const authslice = createSlice({
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
        AsyncStorage.setItem("userToken", action.payload.token);
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
        AsyncStorage.setItem("userToken", action.payload.token);
        AsyncStorage.setItem("userData", JSON.stringify(action.payload.user));
      })
      .addCase(loginUserService.rejected, (state, action: any) => {
        state.isloading = false;
        state.error = action.payload || "Login failed";
      })

      // Update Profile Details
      .addCase(updateProfileDetailsService.pending, (state) => {
        state.isloading = true;
        state.error = "";
      })
      .addCase(updateProfileDetailsService.fulfilled, (state, action) => {
        state.isloading = false;
        state.user = { ...state.user, ...action.payload.user };
        state.details = action.payload.detailsComplete;
        AsyncStorage.setItem("userData", JSON.stringify(state.user));
        AsyncStorage.setItem("details", JSON.stringify(state.details));
      })
      .addCase(updateProfileDetailsService.rejected, (state, action: any) => {
        state.isloading = false;
        state.error = action.payload || "Profile update failed";
      });
  },
});

export const { hydrateAuthState, logout } = authslice.actions;
export default authslice.reducer;
