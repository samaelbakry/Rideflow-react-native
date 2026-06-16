import carImage from "@/assets/images/car1.jpg";
import { drivers } from "@/constants/ride";
import { getDirection, getRoute } from "@/services/getRoute";
import {
  endTrip,
  rideState,
  selectDestination,
  selectedDriver,
  selectOrigin,
  setDriverPosition,
  setTravelInfo,
} from "@/store/slices/rideFlowSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React, { useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";
import MapView, { LatLng, Marker, Polyline } from "react-native-maps";
import tw from "twrnc";

export default function MapContent() {
  const origin = useAppSelector(selectOrigin);
  const destination = useAppSelector(selectDestination);
  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
  const [carPosition, setCarPosition] = useState<LatLng | null>(null);
  const dispatch = useAppDispatch();
  const rideStatus = useAppSelector(rideState);
  const driver = useAppSelector(selectedDriver);
  const mapRef = useRef<MapView>(null);

  async function handleRoute() {
    if (!origin) return;

    if (rideStatus === "driver_assigned" && driver) {
      const coords = await getRoute(
        { latitude: driver.lat, longitude: driver.lng },
        origin,
      );

      setRouteCoords(coords);

      setCarPosition({
        latitude: driver.lat,
        longitude: driver.lng,
      });

      return;
    }

    if (
      (rideStatus === "selecting_car" || rideStatus === "trip_started") &&
      destination
    ) {
      const coords = await getRoute(origin, destination);
      setRouteCoords(coords);
      return;
    }
  }

  useEffect(() => {
    setRouteCoords([]);
    setCarPosition(null);
    handleRoute()
  }, 
  [rideStatus , origin , destination , driver]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelInfo = async () => {
      const route = await getDirection(origin, destination);
      dispatch(setTravelInfo(route));
    };

    getTravelInfo();
  }, [origin, destination]);

useEffect(() => {
  if (!origin || !mapRef.current) return;

  const timer = setTimeout(() => {
    const markers = [];

    if (origin) markers.push("origin");
    if (destination) markers.push("destination");
    if (carPosition) markers.push("driver");

    if (markers.length > 0) {
      mapRef.current?.fitToSuppliedMarkers(markers, {
        edgePadding: { top: 50, bottom: 50, left: 50, right: 50 },
        animated: true,
      });
    }
  }, 200);

  return () => clearTimeout(timer);
}, [origin, destination, carPosition]);

  useEffect(() => {
    if (!routeCoords.length) return;
    let i = 1;

    const timer = setInterval(() => {
      if (i >= routeCoords.length) {
        clearInterval(timer);
        const lastPoint = routeCoords[routeCoords.length - 1];

        if (
          rideStatus === "driver_assigned" &&
          lastPoint &&
          origin &&
          Math.abs(lastPoint.latitude - origin.latitude) < 0.0001 &&
          Math.abs(lastPoint.longitude - origin.longitude) < 0.0001
        ) {
          dispatch(setDriverPosition(true));
        }
        if (rideStatus === "trip_started") {
          dispatch(endTrip());
          setCarPosition(origin);
        }
        return;
      }
      const point = routeCoords[i];

      if (!point) {
        clearInterval(timer);
        return;
      }
      setCarPosition(routeCoords[i]);
      i++;
    }, 700);
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
          <Marker identifier="driver" coordinate={carPosition}>
            <Image
              source={carImage}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
            />
          </Marker>
        )}
        {rideStatus === "selecting_car" &&
          drivers.map((driver) => (
            <Marker
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
