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

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const StackScreens = () => {
    const { login, details } = useAppSelector((state) => state.auth);

    return (
      <Stack>
        {login && !details && (
          <Stack.Screen
            name="(profile-details)"
            options={{ headerShown: false }}
          />
        )}
        {details && login && (
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        )}
        {!login && !details && (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        )}
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
