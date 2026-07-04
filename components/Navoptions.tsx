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
  const navigate = useRouter()

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        tw`rounded-2xl p-3 shadow border w-44`,
        theme.card,
      ]}
    >
      <Image
        source={car}
        style={{
          width: 120,
          height: 70,
          resizeMode: "contain",
          alignSelf: "center",
        }}
      />

      <Text
        style={[
          tw`text-center text-xs mt-2`,
          theme.secondaryText,
        ]}
      >
        Get ride now
      </Text>

      <View style={tw`mt-3 items-center`}>
       
          <TouchableOpacity
            disabled={!origin}
            onPress={() => navigate.push("/maps")}
            style={[
              tw`px-4 py-2 rounded-full flex-row items-center gap-1`,
              {
                backgroundColor: origin
                  ? colors.success
                  : colors.primary,
              },
            ]}
          >
            <Text
              style={[
                tw`text-xs font-semibold`,
                { color: colors.onPrimary },
              ]}
            >
              Start
            </Text>

            <Ionicons
              name="arrow-forward"
              size={16}
              color={colors.onPrimary}
            />
          </TouchableOpacity>
        </View>
      
    </TouchableOpacity>
  );
}