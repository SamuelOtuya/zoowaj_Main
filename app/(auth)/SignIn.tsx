import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux-hooks";
import { loginUser } from "@/redux/services/authService";
import { useRouter } from "expo-router";
import Button from "../../components/Button";
import { fetchAuthenticatedUserData } from "@/redux/services/profileService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Auth() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isLoading, error, login, user } = useAppSelector(
    (state) => state.auth
  );
  const { authUser, loading } = useAppSelector((state) => state.profile);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signInWithEmail() {
    if (!email || !password) {
      return Alert.alert("Empty fields", "Email and password are required.");
    }

    // Email validation
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        email.trim().toLowerCase()
      )
    ) {
      return Alert.alert(
        "Invalid email",
        "Please enter a valid email address."
      );
    }

    // Password validation
    if (password.length < 8) {
      return Alert.alert(
        "Password too short",
        "Password must be at least 8 characters long."
      );
    }

    const userData = { email, password };

    try {
      const loginResponse = await dispatch(loginUser(userData));

      if (loginResponse.meta.requestStatus === "fulfilled") {
        // Check for user profile data in AsyncStorage
        const storedProfileData = await AsyncStorage.getItem("authUser"); // Adjust key as necessary
        const parsedProfileData = storedProfileData
          ? JSON.parse(storedProfileData)
          : null;

        if (parsedProfileData && Object.keys(parsedProfileData).length > 0) {
          // Navigate to home if profile data is found
          router.replace("/(main)/tabs/home");
        } else {
          // Fetch user data from API if no profile data found
          await dispatch(fetchAuthenticatedUserData()).then((fetchResponse) => {
            if (fetchResponse.meta.requestStatus === "fulfilled") {
              // Navigate to home after successful fetch
              router.replace("/(main)/tabs/home");
            } else {
              // Navigate to step one if fetching fails
              router.replace("/(profile-details)/step-1");
            }
          });
        }
      }

      if (error) {
        Alert.alert("Error", error);
        return;
      }
    } catch (error) {
      Alert.alert(
        "Login failed",
        "An error occurred while logging in. Please try again later."
      );
      console.error("Login error:", error);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollview}
        showsVerticalScrollIndicator={false}
      >
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.input}
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Button title={"Sign In"} onPress={signInWithEmail} />
        )}
        <TouchableOpacity
          onPress={() => router.push("/SignUp")}
          style={styles.touchableOpacity}
        >
          <Text style={styles.touchableText}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 50,
  },
  scrollview: {
    paddingBottom: 30,
    backgroundColor: "#D9D9D9",
    padding: 10,
    borderRadius: 10,
    gap: 25,
  },
  input: {
    backgroundColor: "white",
    borderColor: "#d1d5db",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    width: 300,
  },
  touchableOpacity: {
    marginTop: 20,
    alignItems: "center",
  },
  touchableText: {
    color: "#1E90FF",
  },
});
