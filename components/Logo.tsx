import { View, Text, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import r from "@/assets/images/t.jpg";

export default function Logo() {
  return (
    <View style={tw`flex-row items-center mb-1`}>
      <Image
        source={r}
        style={tw`w-10 h-10 `}
        resizeMode="contain"
      />

      <Text style={tw`text-4xl font-bold m-0 p-0`}>
        ide Flow
      </Text>
    </View>
  );
}

