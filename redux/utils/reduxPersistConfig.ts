import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistConfig } from "redux-persist";

const reduxPersistConfig: PersistConfig<any> = {
  key: "root", // Root key to identify the persisted state
  storage: AsyncStorage, // Use AsyncStorage as the storage backend
  whitelist: ["auth", "profile"], // Only persist specific slices
};

export default reduxPersistConfig;
