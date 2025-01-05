import React from "react";
import { Tabs, useRouter } from "expo-router";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const TabLayout = () => {
  const router = useRouter();

  const renderTabBarIcon = (iconName: any) => ({ focused }) => (
    <View style={styles.iconContainer}>
      <Ionicons 
        name={iconName} 
        size={24} 
        color={focused ? "#43CEBA" : "#AEAEAE"}
      />
      {focused && <View style={styles.activeIndicator} />}
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#43CEBA",
        tabBarInactiveTintColor: "#AEAEAE",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Discover",
          headerShadowVisible: false,
          tabBarIcon: renderTabBarIcon("home-outline"),
          headerRight: () => (
            <View style={styles.headerRight}>
              <TouchableOpacity onPress={() => router.push("/")}>
                <Ionicons name="notifications-outline" size={24} color="#43CEBA" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="filter-outline" size={24} color="#43CEBA" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          tabBarIcon: renderTabBarIcon("heart-outline"),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          tabBarIcon: renderTabBarIcon("chatbubble-outline"),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: renderTabBarIcon("person-outline"),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 65,
    paddingTop: 8,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    backgroundColor: "white",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 45,
  },
  activeIndicator: {
    position: "absolute",
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#43CEBA",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    gap: 15,
  },
});

export default TabLayout;