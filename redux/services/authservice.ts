import API from "@/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Register User Service
export const registerUserService = createAsyncThunk(
  "auth/user/register",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await API.post("user/register", data);
      return res.data; // Ensure the backend returns `user` and `token`
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

// Login User Service
export const loginUserService = createAsyncThunk(
  "auth/user/login",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await API.post("user/login", data);
      return res.data; // Ensure backend returns `user` and `token`
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Update Profile Details Service
export const updateProfileDetailsService = createAsyncThunk(
  "auth/user/updateProfileDetails",
  async (data: { details: any }, thunkAPI) => {
    try {
      const res = await API.put("user/update-profile", data);
      return res.data; // Backend should return updated user and detailsComplete status
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Update failed");
    }
  }
);
