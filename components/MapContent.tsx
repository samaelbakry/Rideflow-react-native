import { getDirection, getRoute } from "@/services/getRoute";
import {
  rideState,
  selectDestination,
  selectOrigin,
  setTravelInfo,
} from "@/store/slices/rideFlowSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import MapView, { LatLng, Marker, Polyline } from "react-native-maps";
import carImage from "@/assets/images/car1.jpg";
import tw from "twrnc";
import { drivers } from "@/constants/ride";

export default function MapContent() {
  const origin = useAppSelector(selectOrigin);
  const destination = useAppSelector(selectDestination);
  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
  const [carPosition, setCarPosition] = useState<LatLng | null>(null);
  const dispatch = useAppDispatch();
  const rideStatus = useAppSelector(rideState);
  const mapRef = useRef<MapView>(null);

  async function handleRoute() {
    if (!origin || !destination) return;
    const coords = await getRoute(origin, destination);
    setRouteCoords(coords);
    const route = await getDirection(origin, destination);
    dispatch(setTravelInfo(route));
  }

  useEffect(() => {
    if (!origin || !destination || !mapRef.current) return;
    handleRoute();
    mapRef.current.fitToSuppliedMarkers(["origin", "destination" , "driver"], {
      edgePadding: { top: 50, bottom: 50, left: 50, right: 50 },
      animated: true,
    });
  }, [origin, destination]);

  useEffect(() => {
    if (rideStatus !== "trip_started") return;
    if (!routeCoords.length) return;
    setCarPosition(routeCoords[0]);

    let i = 0;

    const timer = setInterval(() => {
      if (i >= routeCoords.length) {
        clearInterval(timer);
        return;
      }
      const point = routeCoords[i];

      if (!point) {
        clearInterval(timer);
        return;
      }
      setCarPosition(routeCoords[i]);
      i++;
    }, 300);
    return () => clearInterval(timer);
  }, [routeCoords, rideStatus]);

  if (!origin) return null;

  return (
    <View style={tw`flex-1`}>
      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        mapType="mutedStandard"
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        scrollDuringRotateOrZoomEnabled={true}
        region={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {origin && (
          <>
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
            {destination && (
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
            )}
          </>
        )}
        {routeCoords.length > 0 && (
          <>
            <Polyline
              coordinates={routeCoords}
              strokeWidth={8}
              strokeColor="rgba(255,255,255,0.9)"
              lineCap="round"
              lineJoin="round"
            />
            <Polyline
              coordinates={routeCoords}
              strokeWidth={5}
              strokeColor="#007AFF"
              lineCap="round"
              lineJoin="round"
            />

            <Polyline
              coordinates={routeCoords}
              strokeWidth={2}
              strokeColor="#ffffff"
              lineDashPattern={[1, 9]}
              lineCap="round"
            />
          </>
        )}
        {carPosition && (
          <Marker coordinate={carPosition}>
            <Image
              source={carImage}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </Marker>
        )}
        {rideStatus === "selecting_car" &&
  drivers.map((driver) => (
    <Marker
    identifier="driver"
      key={driver.id}
      coordinate={{
        latitude: driver.lat,
        longitude: driver.lng,
      }}
    >
      <Image
        source={carImage}
        style={{
          width: 35,
          height: 35,
          borderRadius: 18,
        }}
      />
    </Marker>
  ))}
      </MapView>
    </View>
  );
}
