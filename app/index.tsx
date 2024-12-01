import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { Redirect } from 'expo-router'; // Import Redirect from expo-router
const logo = require("../assets/images/splash.png");
import fontlogo from "../assets/images/fontlogo.png";
import { useAppSelector } from '@/redux/hooks/redux-hooks';

const SplashScreen = () => {
  const { login, details, isloading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // If loading, do nothing, wait for the state to update
    if (isloading) {
      return;
    }
  }, [isloading]);

  // Redirect logic based on login and details state
  if (login && !details) {
    return <Redirect href="/(profile-details)/profileDetailsone" />;
  } else if (details && login) {
    return <Redirect href="/(main)/tabs/home" />;
  } else if (!login && !details) {
    return <Redirect href="/signup" />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#43CEBA" }}>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: "center", flex: 1 }}>
        <Image source={logo} style={{ height: 130, width: 100, objectFit: 'contain', alignSelf: 'center' }} />
        <Image source={fontlogo} style={{ width: 184, height: 72, objectFit: 'contain' }} />
        <TouchableOpacity
          style={{ position: 'absolute', bottom: 22, backgroundColor: '#F1F1F1', borderRadius: 14, borderColor: 'white' }}
          onPress={() => {
            // Here you can use the router.push() for navigation to signup if needed
            router.push("/signup");
          }}
        >
          <Text style={{ fontSize: 20, color: '#2A2A2A', paddingHorizontal: 70, paddingVertical: 15, fontWeight: 'bold', textAlign: 'center' }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
