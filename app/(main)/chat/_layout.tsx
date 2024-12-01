// app/(chat)/_layout.tsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="chat"
        options={{ title: "Sign Up", headerShown: true }}
      />
    </Stack>
  );
}
