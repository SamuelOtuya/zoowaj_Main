import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  updateProfileDetailsService,
  createProfileDetailsService,
  createProfileImagesService,
} from "../services/profileService";

interface ProfileState {
  data: Record<string, any> | null; // Holds updated profile fields
  authUser: Record<string, any> | null; // Holds full profile info fetched or created
  error: string | null;
  loading: boolean;
}

const initialState: ProfileState = {
  data: null, // Updated profile fields
  authUser: null, // Full profile info
  error: null,
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Reducer for updating individual fields or nested objects
    updateProfileField: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      if (state.data) {
        // If the value is an object, merge it into the existing object for the specific key
        if (typeof action.payload.value === "object") {
          state.data[action.payload.key] = {
            ...state.data[action.payload.key], // Preserve existing properties
            ...action.payload.value, // Merge new properties
          };
        } else {
          state.data[action.payload.key] = action.payload.value;
        }
      } else {
        // If data doesn't exist, initialize it with the update
        state.data = { [action.payload.key]: action.payload.value };
      }
    },

    // Action to set all profile data at once (e.g., after loading from AsyncStorage)
    setProfileData: (state, action: PayloadAction<Record<string, any>>) => {
      state.authUser = action.payload;
    },

    // Reset profile data if needed
    resetProfile: (state) => {
      state.data = null;
      state.authUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileDetailsService.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateProfileDetailsService.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload.profile;
        AsyncStorage.setItem("profileData", JSON.stringify(state.authUser));
      })
      .addCase(updateProfileDetailsService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Profile Update Failed";
      });

    // Create Profile Details
    builder
      .addCase(createProfileDetailsService.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createProfileDetailsService.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = { ...action.payload.profile };
        AsyncStorage.setItem("profileData", JSON.stringify(state.authUser));
      })
      .addCase(createProfileDetailsService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Profile creation failed";
      });

    // Create Profile Images
    builder
      .addCase(createProfileImagesService.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProfileImagesService.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = { ...action.payload.profile };

        // Save profile data to AsyncStorage
        try {
          AsyncStorage.setItem("profileData", JSON.stringify(state.authUser));
        } catch (error) {
          console.error("Error saving profile to AsyncStorage:", error);
        }
      })
      .addCase(createProfileImagesService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Profile image update failed";
      });
  },
});

export const { updateProfileField, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
