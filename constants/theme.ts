import { Platform } from "react-native";

const primary = "#000000";
const accent = "#06C167";

export const Colors = {
  light: {
    // Brand
    primary,
    onPrimary: "#FFFFFF",
    accent,

    // Backgrounds
    background: "#F8FAFC",
    surface: "#FFFFFF",
    card: "#FFFFFF",

    // Text
    text: "#111827",
    textSecondary: "#6B7280",
    textMuted: "#9CA3AF",

    // UI
    border: "#E5E7EB",
    icon: "#6B7280",
    divider: "#F1F5F9",

    // Status
    danger: "#EF4444",
    success: "#22C55E",
    warning: "#F59E0B",

    // Tabs
    tint: primary,
    tabIconDefault: "#9CA3AF",
    tabIconSelected: primary,
  },

  dark: {
    // Brand
    primary: "#FFFFFF",
    onPrimary: "#000000",
    accent,

    // Backgrounds
    background: "#09090B",
    surface: "#18181B",
    card: "#18181B",

    // Text
    text: "#FFFFFF",
    textSecondary: "#A1A1AA",
    textMuted: "#71717A",

    // UI
    border: "#27272A",
    icon: "#A1A1AA",
    divider: "#27272A",

    // Status
    danger: "#EF4444",
    success: "#22C55E",
    warning: "#F59E0B",

    // Tabs
    tint: "#FFFFFF",
    tabIconDefault: "#71717A",
    tabIconSelected: "#FFFFFF",
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace",
  },
});