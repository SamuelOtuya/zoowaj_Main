import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Correct AsyncStorage import
import authReducer from "./slices/authSlice";
import profileReducer from "../redux/slices/profileSlice";
import { PersistConfig } from "redux-persist";

// Persist config for auth state
const persistConfig: PersistConfig<any> = {
  key: "root", // Root key to identify the persisted state
  storage: AsyncStorage, // Use AsyncStorage directly
  whitelist: ["auth", "profile"], // Only persist the 'auth' slice (authentication and user data)
};

const persistedReducer = persistReducer(persistConfig, authReducer);

// Store configuration
export const store = configureStore({
  reducer: {
    auth: persistedReducer, // Auth slice with persistence logic
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ignore persistence related actions
      },
    }),
});

// Set up persistence
export const persister = persistStore(store);
