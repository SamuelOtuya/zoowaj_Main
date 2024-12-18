import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./rootReducer"; // Ensure this imports your combined reducers

// Persist config for Redux store
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

// Wrap the root reducer with the persist logic
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific actions related to persistence
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

// Set up persistence
export const persister = persistStore(store);

// Type definitions for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
