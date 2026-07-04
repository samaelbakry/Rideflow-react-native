import { Promo } from "@/types/PropsTypes";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { createThemeStyles } from "@/constants/theme";

type Props = {
  promo: Promo;
};

export default function PromoCard({ promo }: Props) {
  const colors = useThemeColors();
  const theme = createThemeStyles(colors)

  return (
    <View
      style={[
        tw`w-85 rounded-3xl p-5 my-3 mx-1 overflow-hidden relative justify-between`,
        {
          backgroundColor: theme.card.backgroundColor,
          borderColor: theme.card.borderColor,
          borderWidth: 1,
          minHeight: 170,
        },
      ]}
    >
      
      <View
        style={[
          tw`absolute -right-10 -top-10 w-36 h-36 rounded-full`,
          {
            backgroundColor: colors.primary,
            opacity: 0.12,
            transform: [{ scale: 1.2 }],
          },
        ]}
      />

      <View style={tw`flex-row justify-between items-start flex-1`}>
        <View style={tw`flex-1 pr-4 justify-between h-full`}>
          <View>
            
            <View
              style={[
                tw`self-start px-2.5 py-1 rounded-full mb-3`,
                {
                  backgroundColor: colors.primary,
                },
              ]}
            >
              <Text
                style={[
                  tw`text-[10px] font-extrabold tracking-wider uppercase`,
                  {
                    color: theme.card.backgroundColor
                  },
                ]}
              >
                Special Offer
              </Text>
            </View>

           
            <Text
              numberOfLines={2}
              style={[
                tw`text-xl font-black leading-tight`,
                theme.text,
              ]}
            >
              {promo.title}
            </Text>

           
            <Text
              numberOfLines={2}
              style={[
                tw`text-xs mt-1.5 leading-4`,
                theme.secondaryText,
              ]}
            >
              {promo.subtitle}
            </Text>
          </View>

          
          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              tw`self-start px-5 py-2.5 rounded-xl mt-3`,
              {
                backgroundColor: colors.primary,
              },
            ]}
          >
            <Text
              style={[
                tw`font-bold text-xs`,
                {
                 color: theme.card.backgroundColor
                },
              ]}
            >
              {promo.button_text}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            tw`w-16 h-16 rounded-full mb-2 items-center justify-center self-center`,
            
          ]}
        >
          <Text style={tw`text-2xl`}>🎁</Text>
        </View>
      </View>
    </View>
  );

}