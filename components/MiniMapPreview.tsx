import { getDrivers } from "@/services/rideData";
import { selectedDriver, selectOrigin } from "@/store/slices/rideFlowSlice";
import { useAppSelector } from "@/store/store";
import { Driver } from "@/types/rideTypes";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import tw from "twrnc";

export default function MiniMapPreview() {
  const origin = useAppSelector(selectOrigin);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const driver = useAppSelector(selectedDriver);

  useEffect(() => {
    async function loadCars() {
      const data = await getDrivers();
      setDrivers(data);
    }

    loadCars();
  }, []);
  return (
    <View style={tw`w-full`}>
      <Text
        style={tw`text-gray-400 font-bold mb-3 uppercase text-xs tracking-wider`}
      >
        Drivers Around You
      </Text>
      <View style={tw`h-40 w-full rounded-2xl overflow-hidden bg-[#1e293b]`}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          customMapStyle={darkMapStyle}
          initialRegion={{
            latitude: origin?.latitude ?? 30.0444,
            longitude: origin?.longitude ?? 31.2357,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
        {drivers.map((driver) => (
          <Marker
            key={driver.id}
            coordinate={{
              latitude: driver.lat,
              longitude: driver.lng,
            }}
          />
        ))}
        <View
          style={tw`absolute bottom-0 left-0 right-0 bg-black/60 p-2 items-center`}
        >
          <Text style={tw`text-white text-xs font-medium`}>
            📍{drivers.length} drivers nearby • 3 min away
          </Text>
        </View>
      </View>
    </View>
  );
}

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#1e293b" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#748597" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1e293b" }] },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#28354e" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#64748b" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#0f172a" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1e293b" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#020617" }],
  },
];
