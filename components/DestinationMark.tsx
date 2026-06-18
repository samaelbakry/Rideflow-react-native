import { View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Marker } from "react-native-maps";
import { LatLng } from "@/types/PropsTypes";

export default function DestinationMark({
  destination,
}: {
  destination: LatLng;
}) {
  return (
    <Marker
      identifier="destination"
      coordinate={{
        latitude: destination.latitude,
        longitude: destination.longitude,
      }}
    >
      <View style={tw`items-center justify-center`}>
        <View
          style={tw`absolute w-8 h-8 bg-green-300 rounded-full opacity-30`}
        />
        <View
          style={tw`w-4 h-4 bg-green-600 rounded-full border-2 border-green-400`}
        />
      </View>
    </Marker>
  );
}
