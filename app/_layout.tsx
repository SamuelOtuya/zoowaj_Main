import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { View, Text } from "react-native";
import "../global.css";

// Redux store and persistor
import { store, persister, AppDispatch } from "@/redux/store";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Hide splash screen once fonts are loaded and reset app data
  useEffect(() => {
    const initializeApp = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, [fontsLoaded]);

  // Render a blank screen while fonts are loading
  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Redux Provider for global state management */}
      <Provider store={store}>
        {/* PersistGate to rehydrate the Redux store */}
        <PersistGate
          loading={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Loading...</Text>
            </View>
          }
          persistor={persister}
        >
          {/* Navigation stack for screens */}
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
