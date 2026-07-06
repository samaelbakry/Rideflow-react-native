import AnimatedSplash from "@/components/AnimatedSplash";
import AppNavigator from "@/providers/AppNavigator";
import AuthProvider from "@/providers/AuthProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    async function load() {
      await new Promise((r) => setTimeout(r, 1500));
      setReady(true);
    }
    load();
  }, []);

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) return null;

  return (
   <ReduxProvider>
  {showIntro ? (
    <AnimatedSplash onFinish={() => setShowIntro(false)} />
  ) : (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <AppNavigator />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  )}
</ReduxProvider>
  );
}
