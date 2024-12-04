import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const customBackButton = () => {
  const router = useRouter();
  const backButton = require("../assets/images/backarrow.png");
  return (
    <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
      <Image
        source={backButton}
        style={{ height: 38, width: 38, objectFit: "contain" }}
      />
    </TouchableOpacity>
  );
};

export default customBackButton;

const styles = StyleSheet.create({});
