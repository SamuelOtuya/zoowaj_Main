// app/(chat)/_layout.tsx
import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="chat/_layout"
        options={{  headerShown: false }}
      />
       <Stack.Screen
        name="tabs/_layout"
        options={{headerShown: false}}
      />
    </Stack>
  );
}
