import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  updateProfileDetailsService,
  fetchProfileDataFormStorage,
  createProfileImagesService,
  fetchAuthenticatedUserData,
  fetchUserProfilesFromAPI,
} from "../services/profileService";
import { UserProfileData } from "@/constants/types";
import { UserProfile } from "@/constants/models/userProfile.model";

interface ProfileState {
  data: Record<string, any> | null;
  authUser: UserProfileData | null;
  appProfiles: UserProfileData[];
  error: string | null;
  loading: boolean;
}

const initialState: ProfileState = {
  data: null,
  authUser: null,
  appProfiles: [],
  error: null,
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfileField(
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) {
      if (state.data) {
        if (typeof action.payload.value === "object") {
          state.data[action.payload.key] = {
            ...state.data[action.payload.key],
            ...action.payload.value,
          };
        } else {
          state.data[action.payload.key] = action.payload.value;
        }
      } else {
        state.data = {
          [action.payload.key]: action.payload.value,
        };
      }
    },

    setProfileData(state, action: PayloadAction<any>) {
      const userProfile = UserProfile.fromJSON(action.payload);
      state.authUser = userProfile.toJSON();
      AsyncStorage.setItem("profileData", JSON.stringify(userProfile.toJSON()));
    },

    resetProfile(state) {
      state.data = null;
      state.authUser = null;
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers(builder) {
    builder
      // Update Profile Details
      .addCase(updateProfileDetailsService.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(updateProfileDetailsService.fulfilled, (state, action) => {
        state.loading = false;
        const userProfile = UserProfile.fromJSON(action.payload.profile);
        state.authUser = userProfile.toJSON();
        AsyncStorage.setItem(
          "profileData",
          JSON.stringify(userProfile.toJSON())
        );
      })
      .addCase(updateProfileDetailsService.rejected, (state, action) => {
        state.loading = false;
        const errorMessage = action.error.message || "Profile Update Failed";
        console.error(errorMessage); // Log the error for debugging
        state.error = errorMessage;
      })

      // Fetch Auth User Data from API
      .addCase(fetchAuthenticatedUserData.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(fetchAuthenticatedUserData.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.profile) {
          // Ensure profile exists
          const userProfile = UserProfile.fromJSON(action.payload.profile);
          state.authUser = userProfile.toJSON();
          AsyncStorage.setItem(
            "profileData",
            JSON.stringify(userProfile.toJSON())
          );
        } else {
          const errorMsg = "User Data Unavailable";
          console.warn(errorMsg); // Log warning for missing data
          state.authUser = null;
          state.error = errorMsg;
        }
      })
      .addCase(fetchAuthenticatedUserData.rejected, (state, action) => {
        state.loading = false;
        const errorMessage =
          action.error.message || "Failed to fetch authenticated user data";
        console.error(errorMessage); // Log the error for debugging
        state.error = errorMessage;
      })

      // Fetch User Profiles from API
      .addCase(fetchUserProfilesFromAPI.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(fetchUserProfilesFromAPI.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload && Array.isArray(action.payload)) {
          // Ensure payload is an array
          state.appProfiles = action.payload.map((profile) => {
            const userProfile = UserProfile.fromJSON(profile);
            return userProfile.toJSON();
          });
        } else {
          const errorMsg = "No profiles available";
          console.warn(errorMsg); // Log warning for empty profiles
          state.appProfiles = [];
          state.error = errorMsg;
        }
      })
      .addCase(fetchUserProfilesFromAPI.rejected, (state, action) => {
        state.loading = false;
        const errorMessage =
          action.error.message || "Failed to fetch User profiles";
        console.error(errorMessage); // Log the error for debugging
        state.error = errorMessage;
      });
  },
});

export const { updateProfileField, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
