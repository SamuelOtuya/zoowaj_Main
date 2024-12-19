// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { logout } from "@/redux/slices/authSlice";

// export const handleLogout = async (dispatch: any, router: any) => {
//   try {
//     await AsyncStorage.removeItem("userToken");
//     await AsyncStorage.removeItem("userData");
//     dispatch(logout());
//     router.replace("/(auth)/login"); // Navigate to login
//   } catch (e) {
//     console.error("Logout failed:", e);
//   }
// };
