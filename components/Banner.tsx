import { createThemeStyles } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

type Props = {
  type: "offline" | "online";
};

export const Banner = ({ type }: Props) => {
  const colors = useThemeColors();
  const theme = createThemeStyles(colors);

  const isOffline = type === "offline";

  const statusColor = isOffline ? "rgb(239, 68, 68)" : "rgb(34, 197, 94)";
  const iconName = isOffline ? "cloud-offline-outline" : "checkmark-circle-outline";
  const titleText = isOffline ? "You're Offline" : "Connection Restored";
  const subText = isOffline ? "Check your local network settings" : "Back online and synced";

  return (
    <View
      style={[
        tw`absolute top-12 left-4 right-4 z-50 rounded-3xl border overflow-hidden`,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: "#000",
          shadowOpacity: 0.12,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
          elevation: 8,
        },
        theme.card,
      ]}
    >
      <SafeAreaView edges={["top"]}>
        <View style={tw`px-4 py-3.5 flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center flex-1`}>
            
            <View
              style={[
                tw`w-11 h-11 rounded-2xl items-center justify-center`,
                { backgroundColor: isOffline ? "rgba(239, 68, 68, 0.12)" : "rgba(34, 197, 94, 0.12)" },
              ]}
            >
              <Ionicons
                name={iconName}
                size={22}
                color={statusColor} 
              />
            </View>

            <View style={tw`ml-3.5 flex-1 pr-2`}>
              <Text
                style={[
                  tw`text-sm font-semibold tracking-tight`,
                  { color: colors.text },
                ]}
                numberOfLines={1}
              >
                {titleText}
              </Text>
              <Text
                style={[
                  tw`text-xs mt-0.5 font-normal opacity-60`,
                  { color: colors.text },
                ]}
                numberOfLines={1}
              >
                {subText}
              </Text>
            </View>
          </View>

          <View 
            style={[
              tw`px-2.5 py-1 rounded-full`, 
              { backgroundColor: isOffline ? "rgba(239, 68, 68, 0.08)" : "rgba(34, 197, 94, 0.08)" }
            ]}
          >
            <Text 
              style={[
                tw`text-[10px] font-bold uppercase tracking-wider`, 
                { color: statusColor }
              ]}
            >
              {type}
            </Text>
          </View>

        </View>
      </SafeAreaView>
    </View>
  );
};