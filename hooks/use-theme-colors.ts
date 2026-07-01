import { useAppSelector } from "@/store/store";
import { selectIsDarkMode } from "@/store/slices/themeSlice";
import { Colors } from "@/constants/theme";

export function useThemeColors() {
  const isDarkMode = useAppSelector(selectIsDarkMode);

  return isDarkMode ? Colors.dark : Colors.light;
}