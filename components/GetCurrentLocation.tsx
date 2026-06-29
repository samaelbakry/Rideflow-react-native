import { useCurrentLocation } from "@/hooks/use-current-location";
import { selectOrigin, setOrigin } from "@/store/slices/rideFlowSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function GetCurrentLocation() {
  const dispatch = useAppDispatch();
  const origin = useAppSelector(selectOrigin);

  const { location } = useCurrentLocation();

  const handleLocation = async () => {
    if (!location) return;

    const addressess = await Location.reverseGeocodeAsync({
      latitude: location.lat,
      longitude: location.lng,
    });

    const address = addressess[0];

    let description = [
      address.street,
      address.district,
      address.city,
      address.country,
    ].filter(Boolean).join(", ")

    dispatch(
      setOrigin({
        description,
        latitude: location.lat,
        longitude: location.lng,
      }),
    );
  };

  return (
    <TouchableOpacity onPress={handleLocation} disabled={!!origin}>
      <Ionicons
        name="location-sharp"
        size={20}
        color={origin ? "gray" : "black"}
      />
    </TouchableOpacity>
  );
}
