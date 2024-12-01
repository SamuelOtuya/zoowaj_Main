// app/(chat)/_layout.tsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="emailPasswordsignUp"
        options={{ title: "Sign Up", headerShown: true }}
      />
      <Stack.Screen
        name="Login"
        options={{ title: "Log In", headerShown: true }}
      />
      <Stack.Screen
        name="Profile-details/_layout"
        options={{ headerShown: false }}
      />
    
    </Stack>
  );
}
