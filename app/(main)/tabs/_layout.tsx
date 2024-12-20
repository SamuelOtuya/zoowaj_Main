import React from "react";
import { Tabs, useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";

// Define icon sources using require
const marriageIcon = require("../../../assets/images/homeicon.png");
const matchesIcon = require("../../../assets/images/matches.png");
const messageIcon = require("../../../assets/images/message.png");
const profileIcon = require("../../../assets/images/profile.png");
const notificationIcon = require("../../../assets/images/notificationicon.png");
const filterIcon = require("../../../assets/images/filtericon.png");

const _layout = () => {
  const router = useRouter();

  // Function to render tab bar icons
  const renderTabBarIcon = (icon: any) => ({ color, focused }) => (
    <Image
      source={icon}
      style={{
        width: 24,
        height: 24,
        tintColor: focused ? "#43CEBA" : "black",
      }}
    />
  );

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#43CEBA",
        tabBarInactiveTintColor: "black",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Discover",
          headerShadowVisible: false,
          tabBarIcon: renderTabBarIcon(marriageIcon),
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => router.push("/")}>
                <Image
                  source={notificationIcon}
                  style={{ width: 38, height: 38, marginRight: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={filterIcon}
                  style={{ width: 38, height: 38, marginRight: 15 }}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          tabBarIcon: renderTabBarIcon(matchesIcon),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          tabBarIcon: renderTabBarIcon(messageIcon),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: renderTabBarIcon(profileIcon),
        }}
      />
    </Tabs>
  );
};

export default _layout;
