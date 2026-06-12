import MapContent from "@/components/MapContent";
import NavigateCard from "@/components/NavigateCard";
import React from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import tw from "twrnc";

export default function Maps() {
  return (
    <View>
      <View style={tw`h-1/2`}>
        <MapContent />
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tw`h-1/2 bg-gray-100`}>
          <NavigateCard />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
