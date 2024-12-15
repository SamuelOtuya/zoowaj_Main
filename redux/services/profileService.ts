import { createAsyncThunk } from "@reduxjs/toolkit";
import API, { setAuthToken } from "@/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfileData } from "@/constants/types";

// Update Profile Details
export const updateProfileDetailsService = createAsyncThunk<
  { profile: ProfileData }, // Ensure the return type matches ProfileData structure
  { details: Partial<ProfileData> } // Use Partial to allow partial updates
>("auth/user/updateProfileDetails", async (data, thunkAPI) => {
  try {
    const token = await AsyncStorage.getItem("bearerToken");
    if (!token) return thunkAPI.rejectWithValue("No token found");
    setAuthToken(token);
    const res = await API.put("user/profile-update", data);
    return res.data as { profile: ProfileData }; // Ensure backend returns updated user and detailsComplete status
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || "Update failed");
  }
});

export const createProfileDetailsService = createAsyncThunk(
  "profile/createProfileDetails",
  async (profileData: Record<string, any>, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem("bearerToken");
      if (!token) return thunkAPI.rejectWithValue("No token found");
      setAuthToken(token);
      const response = await API.post("user/profile", profileData);
      console.log("createProfileDetailsService API Response:", response.data); // Debug response structure
      return response.data; //`success` property
    } catch (error: any) {
      console.error(
        "createProfileDetailsService API Error:",
        error.response?.data || error.message
      ); // Debug errors
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to save profile details"
      );
    }
  }
);

export const createProfileImagesService = createAsyncThunk(
  "profile/saveProfileImages",
  async (formData: FormData, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem("bearerToken");
      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }

      const baseURL = "https://social-smart-raven.ngrok-free.app";
      const response = await fetch(`${baseURL}/api/v1/user/profile-images`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data", // Not necessary but can be included
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("createProfileImagesService API Response:", data);
      return data;
    } catch (error: any) {
      console.error("createProfileImagesService API Error:", error); // Log full error object for debugging
      return thunkAPI.rejectWithValue(
        error.message || "Failed to save profile details"
      );
    }
  }
);

// Fetch Authenticated User from Async Storage
export const fetchProfileDataFormStorage = createAsyncThunk<
  any,
  void // No parameters needed for this function
>("auth/user/fetchProfileDataFormStorage", async (_, thunkAPI) => {
  try {
    const userData = await AsyncStorage.getItem("profileData"); // Assuming 'user' is the key used to store user data
    if (userData) {
      return JSON.parse(userData); // Parse and return the user object
    }
    return null; // Return null if no user is found
  } catch (error) {
    console.error("Failed to fetch authenticated user:", error);
    return null; // Return null on error
  }
});

// Fetch Authenticated User from Api
export const fetchAuthenticatedUserData = createAsyncThunk<
  ProfileData | null,
  void // No parameters needed for this function
>("auth/user/fetchUserData", async (_, thunkAPI) => {
  try {
    const token = await AsyncStorage.getItem("bearerToken");
    if (!token) return thunkAPI.rejectWithValue("No token found");

    const response = await API.get(`user/profile/${token}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data as ProfileData; // Ensure backend returns user data in expected format
  } catch (error: any) {
    console.error("Failed to fetch authenticated user:", error);
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch profile details"
    );
  }
});
