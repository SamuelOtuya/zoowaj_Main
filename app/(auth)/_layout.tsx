// app/(chat)/_layout.tsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="SignUp" options={{ title: "Sign Up" }} />
      <Stack.Screen name="SignIn" options={{ title: "Sign In" }} />
    </Stack>
  );
}
