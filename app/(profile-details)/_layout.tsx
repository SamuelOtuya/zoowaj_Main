// app/(profile-details)/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import CustomBackButton from '../components/custombackbutton'; // Ensure the import path is correct

export default function ProfileDetailsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="profileDetailsone"
        options={{
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'Profile Details',
          headerLeft: () => <CustomBackButton />
        }}
      />
      <Stack.Screen
        name="profileDetailstwo"
        options={{
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'Profile Details',
          headerLeft: () => <CustomBackButton />
        }}
      />
      <Stack.Screen
        name="profileDetailsthree"
        options={{
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'Profile Details',
          headerLeft: () => <CustomBackButton />
        }}
      />
      <Stack.Screen
        name="profileDetailsfour"
        options={{
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'Profile Details',
          headerLeft: () => <CustomBackButton />
        }}
      />
      <Stack.Screen
        name="profileDetailsFive"
        options={{
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'Profile Details',
          headerLeft: () => <CustomBackButton />
        }}
      />
      <Stack.Screen
        name="profileDetailsSix"
        options={{
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'Add your Photos',
          headerLeft: () => <CustomBackButton />
        }}
      />
      <Stack.Screen
        name="profileDetailsSeven"
        options={{
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'Verify who you are',
          headerLeft: () => <CustomBackButton />
        }}
      />
      {/* <Stack.Screen
        name="notificationscreen"
        options={{
          headerTitle: 'Notification',
          headerTitleAlign: 'center',
          headerLeft: () => <CustomBackButton />
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack>
  );
}
