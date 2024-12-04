// app/(chat)/_layout.tsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="id" options={{ title: "Sign Up" }} />
    </Stack>
  );
}
