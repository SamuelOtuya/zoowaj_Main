import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { persister, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useAppSelector } from "@/redux/hooks/redux-hooks";
import { View, Text } from "react-native";
import "../global.css";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (loaded) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplashScreen();
  }, [loaded]);

  // If fonts are not loaded yet, return null to avoid rendering the app
  if (!loaded) {
    return null;
  }

  const StackScreens = () => {
    const { login, details } = useAppSelector((state) => state.auth);

    return (
      <Stack screenOptions={{ headerShown: false }}>
        {login && !details && <Stack.Screen name="(profile-details)" />}
        {details && login && <Stack.Screen name="(main)" />}
        {!login && !details && <Stack.Screen name="(auth)" />}
      </Stack>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Redux Provider */}
      <Provider store={store}>
        {/* PersistGate for rehydrating persisted state */}
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
          {/* App Screens */}
          <StackScreens />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
