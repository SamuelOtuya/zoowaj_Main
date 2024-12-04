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
import { registerUserService } from "@/redux/services/authService";
import { Redirect, useRouter } from "expo-router";
import Button from "../../components/Button";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, login, details } = useAppSelector(
    (state) => state.auth
  );

  if (login && !details) {
    return <Redirect href={"/(profile-details)/step-1"} />;
  } else if (login && details) {
    return <Redirect href={"/(main)"} />;
  }

  async function signUpWithEmail() {
    if (!email || !password) {
      return Alert.alert("Empty fields", "Email and password are required.");
    }

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

    if (password.length < 8) {
      return Alert.alert(
        "Password too short",
        "Password must be at least 8 characters long."
      );
    }

    const userData = { email, password };
    const userSignUp = await dispatch(registerUserService(userData));
    if (userSignUp.meta.requestStatus === "fulfilled") {
      return <Redirect href={"/(profile-details)/step-1"} />;
    }

    if (error) {
      Alert.alert("Error", error);
      console.log(error, "=============");
      return;
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
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
          <Button title={"Sign Up"} onPress={signUpWithEmail} />
        )}
        <TouchableOpacity
          onPress={() => router.push("/SignIn")}
          style={styles.touchableOpacity}
        >
          <Text style={styles.touchableText}>
            Already have an account? Sign In
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
  scrollView: {
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
