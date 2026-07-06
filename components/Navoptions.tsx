import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import car from "@/assets/images/car1.png";
import { useAppSelector } from "@/store/store";
import { selectOrigin } from "@/store/slices/rideFlowSlice";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { createThemeStyles } from "@/constants/theme";
import { useRouter } from "expo-router";

export default function Navoptions() {
  const origin = useAppSelector(selectOrigin);
  const colors = useThemeColors();
  const theme = createThemeStyles(colors);
  const navigate = useRouter();

  const handlePress = () => {
    if (origin) {
      navigate.push("/maps");
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={origin ? 0.8 : 1}
      disabled={!origin}
      onPress={handlePress}
      style={[
        tw`rounded-3xl p-5 border w-44 items-center justify-between shadow-sm`,
        theme.card,
        !origin && tw`opacity-60`, 
        origin ? { borderColor: colors.success } : { borderColor: colors.border },
      ]}
    >
      <View style={tw`w-full flex-row justify-end mb-1`}>
        <View 
          style={[
            tw`px-2 py-0.5 rounded-full items-center justify-center`,
            { backgroundColor: origin ? `${colors.success}15` : `${colors.primary}15` }
          ]}
        >
          <Text style={[tw`text-[10px] font-bold`, { color: origin ? colors.success : colors.primary }]}>
            {origin ? "READY" : "SET ORIGIN"}
          </Text>
        </View>
      </View>

      <View style={tw`h-20 justify-center items-center mb-2`}>
        <Image
          source={car}
          style={{
            width: 130,
            height: 75,
            resizeMode: "contain",
          }}
        />
      </View>

      <View style={tw`items-center mb-4`}>
        <Text style={[tw`text-base font-bold tracking-tight`, theme.text]}>
          Get a Ride
        </Text>
        <Text style={[tw`text-center text-xs mt-0.5 font-medium`, theme.secondaryText]}>
          Travel safely anytime
        </Text>
      </View>

      <View
        style={[
          tw`w-10 h-10 rounded-full items-center justify-center shadow-sm`,
          {
            backgroundColor: origin ? colors.success : colors.primary,
          },
        ]}
      >
        <Ionicons
          name={origin ? "arrow-forward" : "pin-outline"}
          size={18}
          color={colors.onPrimary}
        />
      </View>
    </TouchableOpacity>
  );
}