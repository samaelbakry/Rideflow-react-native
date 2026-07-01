import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAppSelector } from "@/store/store";
import { selectIsDarkMode } from "@/store/slices/themeSlice";

export default function AppNavigator() {
  const isDarkMode = useAppSelector(selectIsDarkMode);
  return (
    <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </ThemeProvider>
  );
}
