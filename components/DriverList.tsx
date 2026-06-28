import { supabase } from "@/lib/supabase";
import { createRide, getCars, getDrivers } from "@/services/rideData";
import {
  selectedCar,
  selectPrice,
  selectOrigin,
  selectDestination,
  selectOriginDescription,
  selectDestinationDescription,
  selectTravelTimeInformation,
  setRideId,
  setSelectedDriver,
} from "@/store/slices/rideFlowSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Car, Driver } from "@/types/rideTypes";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function DriverList() {
  const dispatch = useAppDispatch();
  const [cars, setCars] = useState<Car[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const selectedCarType = useAppSelector(selectedCar);

  const origin = useAppSelector(selectOrigin);
  const destination = useAppSelector(selectDestination);

  const originDescription = useAppSelector(selectOriginDescription);
  const destinationDescription = useAppSelector(selectDestinationDescription);

  const travelInfo = useAppSelector(selectTravelTimeInformation);

  const price = useAppSelector(selectPrice);

  useEffect(() => {
    async function loadData() {
      try {
        const [carsData, driversData] = await Promise.all([
          getCars(),
          getDrivers(),
        ]);

        setCars(carsData);
        setDrivers(driversData);
      } catch (error) {
        console.log(error);
      }
    }

    loadData();
  }, []);

  const driversData = drivers.filter(
    (driver) =>
      cars.find((car) => car.id === selectedCarType)?.title ===
      driver.ride_type,
  );

  return (
    <FlatList
      data={driversData}
      keyExtractor={(item) => item.id}
      contentContainerStyle={tw`p-4`}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={async () => {
            if (!item.is_available) return;
            try {
              const {
                data: { user },
              } = await supabase.auth.getUser();
              if (!user) return;
              const ride = await createRide({
                user_id: user.id,

                driver_id: item.id,
                car_id: selectedCarType!,

                origin: originDescription,
                destination: destinationDescription,

                origin_lat: origin!.latitude,
                origin_lng: origin!.longitude,

                destination_lat: destination!.latitude,
                destination_lng: destination!.longitude,

                distance: travelInfo.distance,
                duration: travelInfo.duration,

                price,

                status: "driver_assigned",
              });
              dispatch(setRideId(ride.id))
              dispatch(setSelectedDriver(item));
            } catch (error) {
              console.log(error)
            }
          }}
          style={[
            tw`bg-white rounded-3xl p-4 mb-4 shadow-sm`,
            !item.is_available && tw`opacity-50`,
          ]}
        >
          <View style={tw`flex-row justify-between items-start`}>
            <View>
              <Text style={tw`text-lg font-bold text-gray-900`}>
                {item.name}
              </Text>
              <Text style={tw`text-sm text-gray-500 mt-0.5`}>
                {item.ride_type}
              </Text>
            </View>

            <View
              style={tw`flex-row items-center bg-yellow-50 px-2 py-1 rounded-full`}
            >
              <Text style={tw`text-yellow-500 text-sm`}>⭐</Text>
              <Text style={tw`text-yellow-700 font-semibold text-sm ml-1`}>
                {item.rating}
              </Text>
            </View>
          </View>

          <View style={tw`h-px bg-gray-100 my-3`} />

          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center flex-1`}>
              <View
                style={tw`w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3`}
              >
                <Text style={tw`text-lg`}>🚘</Text>
              </View>
              <View>
                <Text style={tw`text-sm font-medium text-gray-800`}>
                  {item.car_model}
                </Text>
                <Text style={tw`text-xs text-gray-500 mt-0.5`}>
                  {item.plate_number}
                </Text>
              </View>
            </View>

            <View
              style={tw`px-3 py-1.5 rounded-full ${
                item.is_available ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <Text
                style={tw`text-xs font-bold ${
                  item.is_available ? "text-green-700" : "text-red-600"
                }`}
              >
                {item.is_available ? "● Available" : "● Unavailable"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
