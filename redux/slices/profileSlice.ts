import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  updateProfileDetailsService,
  fetchProfileDataFormStorage,
  createProfileImagesService,
  fetchAuthenticatedUserData,
} from "../services/profileService";
import { UserProfileData } from "@/constants/types";
import { UserProfile } from "@/constants/models/userProfile.model";

interface ProfileState {
  data: Record<string, any> | null;
  authUser: UserProfileData | null; // Change type to UserProfileData
  error: string | null;
  loading: boolean;
}

const initialState: ProfileState = {
  data: null,
  authUser: null,
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
      });
  },
});

export const { updateProfileField, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
