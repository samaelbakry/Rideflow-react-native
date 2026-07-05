import { useThemeColors } from "@/hooks/use-theme-colors";
import { selectIsDarkMode } from "@/store/slices/themeSlice";
import { useAppSelector } from "@/store/store";
import React from "react";
import { Image, Text, View } from "react-native";
import tw from "twrnc";

export default function Logo() {
  const colors = useThemeColors();
  const isDarkMode = useAppSelector(selectIsDarkMode);

  const logoSrc = isDarkMode ? require("@/assets/images/logo.dark.png") : require("@/assets/images/logo.light.png");

  return (
    <View style={tw`flex-row items-center mb-1`}>
      <Image source={logoSrc} style={tw`size-6`} resizeMode="contain" />

      <Text style={[tw`text-3xl font-bold m-0 p-0`, { color: colors.primary }]}>
        ide Flow
      </Text>
    </View>
  );
}
