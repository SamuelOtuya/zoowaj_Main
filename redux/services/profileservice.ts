import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/api/api";

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

export const saveProfileDetailsService = createAsyncThunk(
  "profile/saveProfile",
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
