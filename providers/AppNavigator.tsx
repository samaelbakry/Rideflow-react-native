import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAppSelector } from "@/store/store";
import { selectIsDarkMode } from "@/store/slices/themeSlice";
import { useNetworkStatus } from "@/hooks/use-network-status";
import { Banner } from "@/components/Banner";

export default function AppNavigator() {
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const { isConnected, restored } = useNetworkStatus();
  return (
    <>
      {!isConnected && <Banner type="offline" />}

      {isConnected && restored && <Banner type="online" />}

      <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style={isDarkMode ? "light" : "dark"} />
      </ThemeProvider>
    </>
  );
}
