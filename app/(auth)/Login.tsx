import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux-hooks";
import { loginUserService } from "@/redux/services/authService";
import { useRouter } from "expo-router";
import Button from "../components/Button";
import { Redirect } from "expo-router"; // Import Redirect

export default function Auth() {
  const dispatch = useAppDispatch();
  const { isloading, error, login, details } = useAppSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Redirect user based on login and details state
  if (login && !details) {
    return <Redirect href="/(profile-details)/profileDetailsone" />;
  } else if (login && details) {
    return <Redirect href="/(main)" />;
  }

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
      await dispatch(loginUserService(userData));

      if (error) {
        Alert.alert("Error", error);
        return;
      }

      // Conditional redirects will be handled above by the Redirect component
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
        <Button
          title={isloading ? "Processing..." : "Sign In"}
          onPress={signInWithEmail}
        />
        <TouchableOpacity
          onPress={() => router.push("/(auth)/emailPasswordsignUp")}
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
