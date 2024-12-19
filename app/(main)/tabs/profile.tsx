import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
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

const ProfileScreen: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [isFaceIDEnabled, setIsFaceIDEnabled] = useState<boolean>(true);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const profileDetails = useAppSelector((state) => state.profile.authUser);

  useEffect(() => {
    if (profileDetails) {
      setProfileImage(profileDetails.profilePhoto?.url || null);
      setBannerImage(profileDetails.coverPhotos?.[0]?.url || null);
    }
  }, [profileDetails]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      dispatch(logoutAction());
      router.replace("/SignIn");
      Toast.show({
        type: "success",
        text1: "Logged Out",
        text2: "You have successfully logged out.",
      });
    } catch (error) {
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
              style={styles.bannerImage}
            />
          </TouchableOpacity>
          <View style={styles.profileImageContainer}>
            <TouchableOpacity onPress={() => pickImage(setProfileImage)}>
              <Image
                source={{ uri: profileImage || undefined }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.profileSection}>
            <Text style={styles.name}>
              {profileDetails?.about?.username || "Your Name"}
            </Text>
            <Text style={styles.phoneNumber}>
              {profileDetails?.about?.phone_number || "Your Phone Number"}
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
  },
  profileImageContainer: {
    alignItems: "center",
    marginTop: -50, // To overlap the banner image
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 20,
  },
  profileSection: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  phoneNumber: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  settingsSection: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  settingText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
});

export default ProfileScreen;
