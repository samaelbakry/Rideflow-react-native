import { View, Text, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import r from "@/assets/images/t.png";

export default function Logo() {
  return (
    <View style={tw`flex-row items-center mb-1`}>
      <Image
        source={r}
        style={tw`size-6`}
        resizeMode="contain"
      />

      <Text style={tw`text-3xl font-bold m-0 p-0`}>
        ide Flow
      </Text>
    </View>
  );
}

