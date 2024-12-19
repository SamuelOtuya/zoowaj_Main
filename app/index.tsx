import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Redirect, router } from "expo-router";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/redux-hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAuthenticatedUserFormStorage } from "@/redux/services/authService";
import {
  fetchAuthenticatedUserData,
  fetchProfileDataFormStorage,
} from "@/redux/services/profileService";
import { logout } from "@/redux/slices/authSlice";
import { persister } from "@/redux/store"; // Ensure you import your persister

const logo = require("../assets/images/splash.png");
const fontLogo = require("../assets/images/fontLogo.png");

const SplashScreen = () => {
  const dispatch = useAppDispatch();

  // Redux state
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const { authUser, loading } = useAppSelector((state) => state.profile);

  // Local state for managing loading status
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Function to reset app data
  const resetAppData = async () => {
    console.log("Resetting app");
    try {
      await AsyncStorage.clear();
      await persister.purge();
      dispatch(logout());
    } catch (error) {
      console.error("Error during app data reset:", error);
    }
  };

  // Fetch user data from storage and API
  const fetchData = async () => {
    await dispatch(fetchAuthenticatedUserFormStorage());
    await dispatch(fetchProfileDataFormStorage());
    setIsDataLoaded(true);
  };

  const fetchUserDataFromAPI = async () => {
    await dispatch(fetchAuthenticatedUserData());
  };

  // Initialize app on startup
  useEffect(() => {
    const initializeApp = async () => {
      // await resetAppData();
      await fetchData();
    };
    initializeApp();
  }, [dispatch]);

  // Navigate based on user authentication state
  useEffect(() => {
    if (isDataLoaded && !isLoading && !loading) {
      if (user && authUser) {
        router.replace("/(main)/tabs/home");
        // router.replace("/(profile-details)/step-8");
      }
    }
  }, [isDataLoaded, isLoading, loading, user, authUser]);

  // Show a loading indicator while fetching data
  if (!isDataLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Index Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Image source={fontLogo} style={styles.fontLogo} />
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => router.replace("/onboard")}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#43CEBA",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    height: 130,
    width: 100,
  },
  fontLogo: {
    width: 184,
    height: 72,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  getStartedButton: {
    position: "absolute",
    bottom: 22,
    backgroundColor: "#F1F1F1",
    borderRadius: 14,
    paddingHorizontal: 70,
    paddingVertical: 15,
    alignItems: "center",
  },
  getStartedText: {
    fontSize: 20,
    color: "#2A2A2A",
    fontWeight: "bold",
    textAlign: "center",
  },
});
