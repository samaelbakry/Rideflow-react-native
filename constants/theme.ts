import { AppColors } from "@/types/PropsTypes";
import { Platform } from "react-native";

const primary = "#1A1A1E";     
const primaryDark = "#F2F2F3"; 
const accent = "#06C167";

export const Colors: AppColors = {
  light: {
    // Brand
    primary,
    onPrimary: "#FAFAFA",
    accent,

    // Backgrounds
    background: "#F7F8FA",
    surface: "#FFFFFF",
    card: "#FFFFFF",

    // Text
    text: "#1C1C1F",
    textSecondary: "#5B6472",
    textMuted: "#9AA3AF",

    // UI
    border: "#E4E7EC",
    icon: "#5B6472",
    divider: "#EEF1F4",

    // Status
    danger: "#E5484D",
    success: "#1FA463",
    warning: "#F2A93B",

    // Tabs
    tint: primary,
    tabIconDefault: "#9AA3AF",
    tabIconSelected: primary,
  },

  dark: {
    // Brand
    primary: primaryDark,
    onPrimary: "#1A1A1E",
    accent,

    // Backgrounds
    background: "#0D1620",
    surface: "#161B22",
    card: "#1B222B",

    // Text
    text: "#F2F2F3",
    textSecondary: "#A0A8B4",
    textMuted: "#6B7480",

    // UI
    border: "#2A313C",
    icon: "#A0A8B4",
    divider: "#232A33",

    // Status
    danger: "#F16569",
    success: "#3DD68C",
    warning: "#F5B95A",

    // Tabs
    tint: primaryDark,
    tabIconDefault: "#6B7480",
    tabIconSelected: primaryDark,
  },
};

export const createThemeStyles = (colors: AppColors["light"]) => ({
  container: {
    backgroundColor: colors.background,
  },

  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
  },

  surface: {
    backgroundColor: colors.surface,
  },

  text: {
    color: colors.text,
  },

  secondaryText: {
    color: colors.textSecondary,
  },

  mutedText: {
    color: colors.textMuted,
  },

  border: {
    borderColor: colors.border,
  },

  divider: {
    backgroundColor: colors.divider,
  },

  icon: {
    color: colors.icon,
  },

  avatar: {
    backgroundColor: colors.background,
  },

  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    color: colors.text,
  },
  label: {
  color: colors.textMuted,
},

heading: {
  color: colors.text,
  fontWeight: "700",
},

caption: {
  color: colors.textSecondary,
},

shadowCard: {
  backgroundColor: colors.card,
  borderColor: colors.border,
  shadowColor: "#000",
},

sectionTitle: {
  color: colors.textMuted,
},

listItem: {
  backgroundColor: colors.card,
  borderColor: colors.border,
},

chip: {
  backgroundColor: colors.surface,
  borderColor: colors.border,
},

primaryIconContainer: {
  backgroundColor: colors.primary,
},
});

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