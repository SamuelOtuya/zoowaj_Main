import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Fontisto } from "@expo/vector-icons";

const Signup = () => {
  const router = useRouter();
  const splashScreenImage = require("../assets/images/splashscreen2image.png");
  const appleIcon = require("../assets/images/appleIcon.png");
  const googleIcon = require("../assets/images/googleIcon.png");

  return (
    <ImageBackground source={splashScreenImage} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/SignIn")}
        >
          <Fontisto name="email" size={24} color="black" />
          <Text style={styles.buttonText}>Continue with Email/Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/SignIn")}
        >
          <Image source={appleIcon} style={styles.icon} />
          <Text style={styles.buttonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={() => router.push("/SignUp")}
        >
          <Image source={googleIcon} style={styles.icon} />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing you agree to our Terms and Conditions
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Signup;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    paddingHorizontal: 45,
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: "10%",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    gap: 10,
    marginBottom: 10,
  },
  googleButton: {
    marginTop: 0,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  icon: {
    height: 28,
    width: 28,
    resizeMode: "contain", // Use resizeMode instead of objectFit for React Native
    marginRight: 4,
  },
  termsText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginTop: 8,
  },
});
