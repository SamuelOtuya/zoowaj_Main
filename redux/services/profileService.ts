import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/api/api";

// Update Profile Details Service
export const updateProfileDetailsService = createAsyncThunk(
  "auth/user/updateProfileDetails",
  async (data: { details: any }, thunkAPI) => {
    try {
      const res = await API.put("user/profile-update", data);
      return res.data; // Backend should return updated user and detailsComplete status
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

export const createProfileDetailsService = createAsyncThunk(
  "profile/saveProfileDetails",
  async (profileData: Record<string, any>, thunkAPI) => {
    try {
      const response = await API.post("user/profile", profileData);
      console.log("API Response:", response.data); // Debug response structure
      return response.data; //`success` property
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message); // Debug errors
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to save profile details"
      );
    }
  }
);

export const createProfileImagesService = createAsyncThunk(
  "profile/saveProfileImages",
  async (profileData: any, thunkAPI) => {
    try {
      const response = await API.post("user/profile-images", {
        headers: {
          Accept: "*", //"application/json",
          "Content-Type": "multipart/form-data",
        },
        body: profileData,
      });
      console.log("API Response:", response.data); // Debug response structure
      return response.data; //`success` property
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message); // Debug errors
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to save profile details"
      );
    }
  }
);
