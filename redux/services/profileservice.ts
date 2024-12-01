import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/api/api";

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
