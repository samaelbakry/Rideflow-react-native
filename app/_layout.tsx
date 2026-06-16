import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

import { useColorScheme } from "@/hooks/use-color-scheme";
import ReduxProvider from "@/providers/ReduxProvider";
import { useEffect, useState } from "react";
import AnimatedSplash from "@/components/AnimatedSplash";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [ready, setReady] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

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
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </ThemeProvider>
    </ReduxProvider>
  );
}