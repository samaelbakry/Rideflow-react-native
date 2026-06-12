import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useColorScheme } from "@/hooks/use-color-scheme";
import ReduxProvider from "@/providers/ReduxProvider";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
   <ReduxProvider>
     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="maps" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
   </ReduxProvider>
  );
}