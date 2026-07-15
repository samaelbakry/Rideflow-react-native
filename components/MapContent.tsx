import { getDirection, getRoute } from "@/services/getRoute";
import { saveRecentPlace } from "@/services/recentRides";
import { updateRideStatus } from "@/services/rideData";
import { selectUser } from "@/store/slices/authSlice";
import {
  endTrip,
  rideState,
  selectDestination,
  selectDestinationDescription,
  selectedDriver,
  selectedRideId,
  selectOrigin,
  setDriverPosition,
  setTravelInfo,
} from "@/store/slices/rideFlowSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const destinationDescription = useAppSelector(selectDestinationDescription);
  const userId = useAppSelector(selectUser)?.id;
  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
  const [carPosition, setCarPosition] = useState<LatLng | null>(null);

  const dispatch = useAppDispatch();
  const rideStatus = useAppSelector(rideState);
  const driver = useAppSelector(selectedDriver);
  const rideId = useAppSelector(selectedRideId);
  const mapRef = useRef<MapView>(null);

  const handleRoute = useCallback(async () => {
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
  }, [rideStatus, driver, origin, destination]);

  useEffect(() => {
    handleRoute();
  }, [handleRoute]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelInfo = async () => {
      const route = await getDirection(origin, destination);
      dispatch(setTravelInfo(route));
    };

    getTravelInfo();
  }, [origin, destination, dispatch]);

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
    }, 800);

    return () => clearTimeout(timer);
  }, [origin, destination, carPosition]);

  useEffect(() => {
    if (!routeCoords.length) return;

    if (rideStatus === "searching_drivers") return;

    let i = 1;

    const timer = setInterval(async () => {
      if (i >= routeCoords.length) {
        clearInterval(timer);

        if (rideStatus === "driver_assigned") {
          dispatch(setDriverPosition(true));
          setCarPosition(origin);
          setRouteCoords([]);
        }

        if (rideStatus === "trip_started") {
          if (rideId) {
            await updateRideStatus(rideId!, "trip_ended");
          }
          dispatch(endTrip());
          await saveRecentPlace({
            user_id: userId!,
            title: destinationDescription!,
            address: destinationDescription!,
            latitude: destination?.latitude!,
            longitude: destination?.longitude!,
          });
          setCarPosition(null);
        }

        return;
      }
      setCarPosition(routeCoords[i]);
      i++;
    }, 200);

    return () => clearInterval(timer);
  }, [
    routeCoords,
    rideStatus,
    destinationDescription,
    destination,
    rideId,
    userId,
    dispatch,
    origin,
  ]);

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
