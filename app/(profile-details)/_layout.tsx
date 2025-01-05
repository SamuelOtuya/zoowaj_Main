// app/(profile-details)/_layout.tsx
import { Stack } from "expo-router";
import React from "react";
import CustomBackButton from "../../components/custombackbutton"; // Ensure the import path is correct

export default function ProfileDetailsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="step-1"
        options={{
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitle: "Profile Details",
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen
        name="step-2"
        options={{
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitle: "Profile Details",
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen
        name="step-3"
        options={{
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitle: "Profile Details",
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen
        name="step-4"
        options={{
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitle: "Profile Details",
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen
        name="step-5"
        options={{
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitle: "Profile Details",
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen
        name="step-6"
        options={{
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitle: "Add your Photos",
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen
        name="step-7"
        options={{
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitle: "Verify who you are",
          headerLeft: () => <CustomBackButton />,
        }}
      />
       <Stack.Screen
        name="step-8"
        options={{
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitle: "Profile&Cover Photos",
          headerLeft: () => <CustomBackButton />,
        }}
      />
    </Stack>
  );
}
