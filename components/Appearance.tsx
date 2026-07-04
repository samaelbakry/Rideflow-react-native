import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { selectIsDarkMode, toggleTheme } from "@/store/slices/themeSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { createThemeStyles } from "@/constants/theme";

export default function Appearance() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(selectIsDarkMode);

  const colors = useThemeColors();
  const theme = createThemeStyles(colors);

  const themeOptions = [
    { label: "Light", value: "light", icon: "sunny-outline" as const },
    { label: "Dark", value: "dark", icon: "moon-outline" as const },
  ];

  const currentTheme = isDarkMode ? "dark" : "light";

  const handleThemeChange = (value: "light" | "dark") => {
    dispatch(toggleTheme(value === "dark"));
  };

  return (
    <View style={tw`flex-row items-center justify-between w-full`}>
      <View style={tw`flex-1 mr-4`}>
        <View style={tw`flex-row items-center mb-0.5`}>
          <Ionicons
            name={isDarkMode ? "moon-outline" : "sunny-outline"}
            size={18}
            color={colors.icon}
          />

          <Text
            style={[tw`font-semibold text-base ml-2`, theme.text]}
          >
            Theme
          </Text>
        </View>
      </View>

      <View
        style={[
          tw`flex-row p-1 rounded-2xl border`,
          theme.surface,
          theme.border,
        ]}
      >
        {themeOptions.map((option) => {
          const isActive = currentTheme === option.value;

          return (
            <TouchableOpacity
              key={option.value}
              activeOpacity={0.8}
              onPress={() =>
                handleThemeChange(option.value as "light" | "dark")
              }
              style={[
                tw`flex-row items-center px-4 py-2 rounded-xl`,
                isActive && theme.card,
              ]}
            >
              <Ionicons
                name={option.icon}
                size={15}
                color={
                  isActive ? colors.text : colors.textSecondary
                }
              />

              <Text
                style={[
                  tw`text-sm ml-1.5`,
                  isActive
                    ? [theme.text, { fontWeight: "700" }]
                    : theme.secondaryText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}