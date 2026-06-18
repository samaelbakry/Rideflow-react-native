import { LatLng } from "@/types/PropsTypes";
import React from "react";
import { View } from "react-native";
import { Marker } from "react-native-maps";
import tw from "twrnc";

export default function UserOriginMark({ origin }: { origin: LatLng }) {
  return (
    <Marker
      identifier="origin"
      coordinate={{
        latitude: origin.latitude,
        longitude: origin.longitude,
      }}
    >
      <View style={tw`items-center justify-center`}>
        <View
          style={tw`absolute w-8 h-8 bg-blue-300 rounded-full opacity-30`}
        />
        <View
          style={tw`w-4 h-4 bg-blue-600 rounded-full border-2 border-blue-400`}
        />
      </View>
    </Marker>
  );
}
