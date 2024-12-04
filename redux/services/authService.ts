// Define an interface for the response from login/register services
interface AuthResponse {
  token: string; // JWT token for authentication
  user: Record<string, any>; // User object returned from the server
}

// Usage in your services
import API from "@/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Register User Service
export const registerUserService = createAsyncThunk<
  AuthResponse,
  { email: string; password: string }
>("auth/user/register", async (data, thunkAPI) => {
  try {
    const res = await API.post("user/register", data);
    return res.data as AuthResponse; // Ensure the backend returns `user` and `token`
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || "Registration failed"
    );
  }
});

// Login User Service
export const loginUserService = createAsyncThunk<
  AuthResponse,
  { email: string; password: string }
>("auth/user/login", async (data, thunkAPI) => {
  try {
    const res = await API.post("user/login", data);
    return res.data as AuthResponse; // Ensure backend returns `user` and `token`
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
  }
});
