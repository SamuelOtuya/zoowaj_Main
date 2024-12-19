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
  authUser: UserProfileData | null; // Change type to UserProfileData
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
    updateProfileField(state, action) {
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

    setProfileData(state, action) {
      const userProfile = UserProfile.fromJSON(action.payload);
      state.authUser = userProfile.toJSON(); // Store plain object instead of class instance
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
      //Update Profile Details
      .addCase(updateProfileDetailsService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileDetailsService.fulfilled, (state, action) => {
        state.loading = false;
        const userProfile = UserProfile.fromJSON(action.payload.profile);
        state.authUser = userProfile.toJSON(); // Store plain object instead of class instance
        AsyncStorage.setItem(
          "profileData",
          JSON.stringify(userProfile.toJSON())
        );
      })
      .addCase(updateProfileDetailsService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Profile Update Failed";
      })

      //Fetch Auth User Data from API
      .addCase(fetchAuthenticatedUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuthenticatedUserData.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const userProfile = UserProfile.fromJSON(action.payload.profile);
          state.authUser = userProfile.toJSON(); // Store plain object instead of class instance
          AsyncStorage.setItem(
            "profileData",
            JSON.stringify(userProfile.toJSON())
          );
        } else {
          state.authUser = null;
          state.error = "User Data Unavailable";
        }
      })
      .addCase(fetchAuthenticatedUserData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch authenticated user data";
      })

      // In your reducer file where you handle actions
      .addCase(fetchUserProfilesFromAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfilesFromAPI.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload && action.payload.length > 0) {
          state.appProfiles = action.payload.map((profile) => {
            const userProfile = UserProfile.fromJSON(profile);
            return userProfile.toJSON();
          }); // Convert each UserProfile instance back to JSON if needed
        } else {
          state.appProfiles = [];
          state.error = "User Data Unavailable";
        }
      })
      .addCase(fetchUserProfilesFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch User profiles";
      });
  },
});

export const { updateProfileField, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
