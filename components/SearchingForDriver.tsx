import { createThemeStyles } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import tw from "twrnc";

export const SearchingForDriver = () => {
  const colors = useThemeColors();
  const theme = createThemeStyles(colors);

  return (
    <View style={tw`flex-1 justify-center items-center px-6 py-16`}>
      <View style={tw`items-center justify-center w-44 h-44`}>
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={1800}
          style={[
            tw`absolute w-44 h-44 rounded-full`,
            {
              backgroundColor: `${colors.success}10`,
            },
          ]}
        />

        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={1800}
          delay={300}
          style={[
            tw`absolute w-32 h-32 rounded-full`,
            {
              backgroundColor: `${colors.success}20`,
            },
          ]}
        />

        <View
          style={[
            tw`w-24 h-24 rounded-full items-center justify-center shadow-lg`,
            theme.card,
          ]}
        >
          <Ionicons
            name="car-sport"
            size={34}
            color={colors.primary}
          />

        </View>
      </View>

      <Animatable.Text
        animation="fadeInUp"
        style={[
          tw`text-2xl font-bold mt-8`,
          theme.text,
        ]}
      >
        Finding your driver
      </Animatable.Text>

      <Animatable.Text
        animation="fadeInUp"
        delay={200}
        style={[
          tw`text-center mt-3 px-6 leading-6`,
          theme.secondaryText,
        ]}
      >
        We&apos;re matching you with the nearest available driver.
        This usually takes just a few seconds.
      </Animatable.Text>

      <Animatable.View
        animation="fadeInUp"
        delay={400}
        style={[
          tw`mt-8 w-full rounded-3xl p-4 flex-row items-center`,
          theme.card,
        ]}
      >
        <View
          style={[
            tw`w-12 h-12 rounded-full items-center justify-center`,
            {
              backgroundColor: `${colors.success}15`,
            },
          ]}
        >
          <Ionicons
            name="location"
            size={22}
            color={colors.success}
          />
        </View>

        <View style={tw`ml-4 flex-1`}>
          <Text
            style={[
              tw`font-semibold`,
              theme.text,
            ]}
          >
            Searching nearby drivers
          </Text>

          <Text
            style={[
              tw`text-xs mt-1`,
              theme.secondaryText,
            ]}
          >
            Expanding search radius...
          </Text>
        </View>

        <ActivityIndicator
          color={colors.primary}
        />
      </Animatable.View>
    </View>
  );
};