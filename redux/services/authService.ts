// Define an interface for the response from login/register services
interface AuthResponse {
  token: string; // JWT token for authentication
  user: Record<string, any>; // User object returned from the server
}

// Usage in your services
import API from "@/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Register User Service
export const registerUser = createAsyncThunk<
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
export const loginUser = createAsyncThunk<
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

// Fetch Authenticated User from Async Storage
export const fetchAuthenticatedUserFormStorage = createAsyncThunk<
  AuthResponse | null,
  void // No parameters needed for this function
>("auth/user/fetchAuthenticatedUserFormStorage", async (_, thunkAPI) => {
  try {
    const userDataString = await AsyncStorage.getItem("user");
    if (userDataString) {
      return JSON.parse(userDataString);
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch authenticated user:", error);
    return thunkAPI.rejectWithValue("Failed to fetch authenticated user");
  }
});

// Fetch User and Role from Backend API
export const authenticateToken = createAsyncThunk<
  AuthResponse | null,
  void // No parameters needed for this function
>("auth/user/authenticate", async (_, thunkAPI) => {
  try {
    const tokenString = await AsyncStorage.getItem("bearerToken");
    if (!tokenString) {
      return thunkAPI.rejectWithValue("No token found");
    }

    const res = await API.get("user/profile", {
      headers: { Authorization: `Bearer ${tokenString}` },
    });

    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || "Authentication failed"
    );
  }
});
