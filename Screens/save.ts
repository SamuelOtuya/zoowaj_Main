// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import authReducer from "./slices/authSlice";
// import profileReducer from "../redux/slices/profileSlice";
// import { PersistConfig } from "redux-persist";

// // Persist config for auth state
// const persistConfig: PersistConfig<any> = {
//   key: "root", // Root key to identify the persisted state
//   storage: AsyncStorage, // Use AsyncStorage directly
//   whitelist: ["auth", "profile"], // Only persist the 'auth' slice (authentication and user data)
// };

// // Persisted reducer for auth
// const authPersistedReducer = persistReducer(persistConfig, authReducer);
// const profilePersistedReducer = persistReducer(persistConfig, profileReducer);

// // Store configuration
// export const store = configureStore({
//   reducer: {
//     auth: authPersistedReducer, // Auth slice with persistence logic
//     profile: profilePersistedReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ["persist/PERSIST"], // Ignore persistence-related actions
//       },
//     }),
// });

// // Set up persistence
// export const persister = persistStore(store);

// // Type the RootState to represent the entire store's state
// export type RootState = ReturnType<typeof store.getState>;

// // Type the ApiDispatch to represent the dispatch function of your store, useful for async actions
// export type AppDispatch = typeof store.dispatch;
