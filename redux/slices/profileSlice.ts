import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  saveProfileDetailsService,
  updateProfileDetailsService,
} from "../services/profileservice";

interface ProfileState {
  data: Record<string, any> | null;
  error: string | null;
  loading: boolean;
}

const initialState: ProfileState = {
  data: {},
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
      }
    },

    // Action to set all profile data at once (e.g., after loading from AsyncStorage)
    setProfileData: (state, action: PayloadAction<Record<string, any>>) => {
      state.data = action.payload;
    },

    // Reset profile data if needed
    resetProfile: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //save profile details
      .addCase(saveProfileDetailsService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProfileDetailsService.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Store the response data
        state.error = null;
      })
      .addCase(saveProfileDetailsService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Capture error message
      });

    // Update Profile Details
    // .addCase(updateProfileDetailsService.pending, (state) => {
    //   state.isloading = true;
    //   state.error = "";
    // })
    // .addCase(updateProfileDetailsService.fulfilled, (state, action) => {
    //   state.isloading = false;
    //   state.user = { ...state.user, ...action.payload.user };
    //   state.details = action.payload.detailsComplete;
    //   AsyncStorage.setItem("userData", JSON.stringify(state.user));
    //   AsyncStorage.setItem("details", JSON.stringify(state.details));
    // })
    // .addCase(updateProfileDetailsService.rejected, (state, action: any) => {
    //   state.isloading = false;
    //   state.error = action.payload || "Profile update failed";
    // });
  },
});

// Async actions for persisting/loading data to/from AsyncStorage
export const saveProfileToStorage =
  () => async (dispatch: any, getState: any) => {
    const profileData = getState().profile.data;
    if (profileData) {
      try {
        await AsyncStorage.setItem("profileData", JSON.stringify(profileData));
      } catch (error) {
        console.error("Error saving profile to AsyncStorage:", error);
      }
    }
  };

export const loadProfileFromStorage = () => async (dispatch: any) => {
  try {
    const profileData = await AsyncStorage.getItem("profileData");
    if (profileData) {
      dispatch(setProfileData(JSON.parse(profileData)));
    }
  } catch (error) {
    console.error("Error loading profile from AsyncStorage:", error);
  }
};

export const { updateProfileField, setProfileData, resetProfile } =
  profileSlice.actions;
export default profileSlice.reducer;
