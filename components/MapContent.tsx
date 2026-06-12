import { Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { LatLng, Marker, Polyline } from "react-native-maps";
import tw from "twrnc";
import { useAppSelector } from "@/store/store";
import { selectDestination, selectOrigin } from "@/store/slices/rideFlowSlice";
import { getRoute } from "@/services/getRoute";

export default function MapContent() {
  const origin = useAppSelector(selectOrigin);
  const destination = useAppSelector(selectDestination);
  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
  const mapRef = useRef<MapView>(null)

  async function handleRoute() {
    const coords = await getRoute(origin, destination);
    setRouteCoords(coords);
  }

  useEffect(() => {
    if (!origin || !destination || !mapRef.current) return;
    handleRoute()

    mapRef.current.fitToSuppliedMarkers(["origin" ,"destination"] ,{
      edgePadding:{top:50 , bottom:50 , left:50 , right:50},
      animated:true
    })

  }, [origin, destination]);

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
                  style={tw`w-4 h-4 bg-blue-600 rounded-full border-2 border-white`}
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
                    style={tw`w-4 h-4 bg-green-600 rounded-full border-2 border-white`}
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
      </MapView>
    </View>
  );
}
