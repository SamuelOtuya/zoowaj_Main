import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  updateProfileDetailsService,
  fetchProfileDataFormStorage,
  createProfileImagesService,
  fetchAuthenticatedUserData,
} from "../services/profileService";
import { ProfileData } from "@/constants/types";

interface ProfileState {
  data: ProfileData | null; // Holds updated profile fields
  authUser: ProfileData | null; // Holds full profile info fetched or created
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
    updateProfileField: (
      state,
      action: PayloadAction<{ key: keyof ProfileData; value: any }>
    ) => {
      if (state.data) {
        if (typeof action.payload.value === "object") {
          state.data[action.payload.key] = {
            ...state.data[action.payload.key], // Preserve existing properties
            ...action.payload.value, // Merge new properties
          };
        } else {
          state.data[action.payload.key] = action.payload.value;
        }
      } else {
        state.data = {
          [action.payload.key]: action.payload.value,
        } as ProfileData; // Initialize with the update
      }
    },

    setProfileData: (state, action: PayloadAction<ProfileData>) => {
      state.authUser = action.payload; // Set full profile data
      AsyncStorage.setItem("profileData", JSON.stringify(action.payload)); // Save to AsyncStorage
    },

    resetProfile: (state) => {
      state.data = null;
      state.authUser = null;
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      //Update User Profile
      .addCase(updateProfileDetailsService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileDetailsService.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload.profile;
        AsyncStorage.setItem("profileData", JSON.stringify(state.authUser));
      })
      .addCase(updateProfileDetailsService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Profile Update Failed";
      })

      //Fetch profile data from storage
      .addCase(fetchProfileDataFormStorage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileDataFormStorage.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = { ...action.payload.profile };
        AsyncStorage.setItem("profileData", JSON.stringify(state.authUser));
      })
      .addCase(fetchProfileDataFormStorage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Profile creation failed";
      })

      .addCase(createProfileImagesService.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProfileImagesService.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = { ...action.payload.profile };

        try {
          AsyncStorage.setItem("profileData", JSON.stringify(state.authUser));
        } catch (error) {
          console.error("Error saving profile to AsyncStorage:", error);
        }
      })
      .addCase(createProfileImagesService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Profile image update failed";
      })

      .addCase(fetchAuthenticatedUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuthenticatedUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;

        try {
          AsyncStorage.setItem("profileData", JSON.stringify(state.authUser));
        } catch (error) {
          console.error("Error saving profile data to AsyncStorage:", error);
        }
      })
      .addCase(fetchAuthenticatedUserData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch authenticated user data";
      });
  },
});

export const { updateProfileField, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
