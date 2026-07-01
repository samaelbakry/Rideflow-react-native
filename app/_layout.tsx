import AnimatedSplash from "@/components/AnimatedSplash";
import AppNavigator from "@/providers/AppNavigator";
import AuthProvider from "@/providers/AuthProvider";
import ReduxProvider from "@/providers/ReduxProvider";
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

  if (showIntro) {
    return <AnimatedSplash onFinish={() => setShowIntro(false)} />;
  }

  return (
    <ReduxProvider>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
         <AppNavigator/>
        </GestureHandlerRootView>
      </AuthProvider>
    </ReduxProvider>
  );
}
