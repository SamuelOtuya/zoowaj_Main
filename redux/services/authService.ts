import API from "@/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Register User Service
export const registerUserService = createAsyncThunk(
  "auth/user/register",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await API.post("user/register", data);
      return res.data; // Ensure the backend returns `user` and `token`
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Registration failed"
      );
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
