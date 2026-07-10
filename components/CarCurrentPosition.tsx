import { LatLng } from "@/types/PropsTypes";
import React from "react";
import { Image } from "react-native";
import { Marker } from "react-native-maps";
import carImage from "@/assets/images/car1.png";

export default function CarCurrentPosition({carPosition}: {carPosition: LatLng}) {
  return (
    <Marker identifier="driver" coordinate={carPosition}>
      <Image
        source={carImage}
        resizeMode="contain"
        style={{
          width: 50,
          height: 50,
          borderRadius: 20,
        }}
      />
    </Marker>
  );
}
