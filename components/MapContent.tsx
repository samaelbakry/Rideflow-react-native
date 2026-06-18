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
import { View } from "react-native";
import MapView, { LatLng } from "react-native-maps";
import tw from "twrnc";
import CarCurrentPosition from "./CarCurrentPosition";
import DestinationMark from "./DestinationMark";
import DestinationRoutePolyline from "./DestinationRoutePolyline";
import StaticCars from "./StaticCars";
import UserOriginMark from "./UserOriginMark";

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

    if (rideStatus === "searching_drivers") {
      setRouteCoords([]);
      setCarPosition(null);
      return;
    }

    if (rideStatus === "driver_assigned" && driver) {
      const coords = await getRoute(
        { latitude: driver.lat, longitude: driver.lng },
        origin,
      );

      setCarPosition({
        latitude: driver.lat,
        longitude: driver.lng,
      });

      setRouteCoords(coords);
      return;
    }

    if (rideStatus === "trip_started" && destination) {
      const coords = await getRoute(origin, destination);
      setRouteCoords(coords);
      return;
    }

    setRouteCoords([]);
  }

  useEffect(() => {
    handleRoute();
  }, [rideStatus, driver, origin, destination]);

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
    }, 300);

    return () => clearTimeout(timer);
  }, [origin, destination, carPosition]);

  useEffect(() => {
    if (!routeCoords.length) return;

    if (rideStatus === "searching_drivers") return;

    let i = 1;

    const timer = setInterval(() => {
      if (i >= routeCoords.length) {
        clearInterval(timer);

        if (rideStatus === "driver_assigned") {
          dispatch(setDriverPosition(true));
          setCarPosition(origin);
        }

        if (rideStatus === "trip_started") {
          dispatch(endTrip());
          setCarPosition(null);
        }

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
            <UserOriginMark origin={origin} />
            {destination && <DestinationMark destination={destination} />}
          </>
        )}

        {routeCoords.length > 0 && rideStatus !== "searching_drivers" && (
          <DestinationRoutePolyline routeCoords={routeCoords} />
        )}

        {carPosition && <CarCurrentPosition carPosition={carPosition} />}
        {rideStatus === "selecting_car" && <StaticCars />}
      </MapView>
    </View>
  );
}
