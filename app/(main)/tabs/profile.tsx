import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Image,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux-hooks";
import { logout as logoutAction } from "@/redux/slices/authSlice";
import { UserProfile } from "@/constants/models/userProfile.model";

const API_ENDPOINT = "https://your-api-endpoint.com/api"; // Replace with your API endpoint

const ProfileScreen: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [isFaceIDEnabled, setIsFaceIDEnabled] = useState<boolean>(true);

  const router = useRouter();
  const dispatch = useAppDispatch();

  // Select authUser data from Redux store
  const profileDetails = useAppSelector((state) => state.profile.authUser);

  // Update local state when profileDetails changes
  useEffect(() => {
    if (profileDetails) {
      setProfileImage(profileDetails.profilePhoto.url || null);
      setBannerImage(profileDetails.coverPhotos[0]?.url || null);
    }
  }, [profileDetails]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Clear local storage
      dispatch(logoutAction()); // Dispatch Redux logout action
      console.log("Logout successful");
      router.replace("/SignIn"); // Redirect to SignIn page
      Toast.show({
        type: "success",
        text1: "Logged Out",
        text2: "You have successfully logged out.",
      });
    } catch (error) {
      console.error("Logout failed:", error);
      Toast.show({
        type: "error",
        text1: "Logout Error",
        text2: "Failed to log out. Please try again.",
      });
    }
  };

  const pickImage = async (
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <>
      <StatusBar style="light" backgroundColor="black" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <TouchableOpacity onPress={() => pickImage(setBannerImage)}>
            <Image
              source={{ uri: bannerImage || undefined }}
              style={[styles.bannerImage]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pickImage(setProfileImage)}>
            <Image
              source={{ uri: profileImage || undefined }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>
              {profileDetails?.about.username || "Loading..."}
            </Text>
            <Text style={styles.location}>
              {profileDetails?.about.phone_number || "Loading..."}
            </Text>
          </View>
          <View style={styles.settingsSection}>
            <View style={styles.settingItem}>
              <Ionicons name="finger-print-outline" size={24} color="#20B2AA" />
              <Text style={styles.settingText}>Face ID / Touch ID</Text>
              <Switch
                value={isFaceIDEnabled}
                onValueChange={setIsFaceIDEnabled}
              />
            </View>
            <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={24} color="#20B2AA" />
              <Text style={styles.settingText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  bannerImage: {
    height: 200,
    width: "100%",
    marginBottom: -50,
  },
  profileInfo: {
    alignItems: "center",
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: -50,
    marginTop: -20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  settingsSection: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  settingText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
});

export default ProfileScreen;
