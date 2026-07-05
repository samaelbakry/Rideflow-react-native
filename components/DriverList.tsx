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
import { useThemeColors } from "@/hooks/use-theme-colors";
import { createThemeStyles } from "@/constants/theme";

export default function DriverList() {
  const dispatch = useAppDispatch();

  const colors = useThemeColors();
  const theme = createThemeStyles(colors);

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
      cars.find((car) => car.id === selectedCarType)?.title === driver.ride_type,
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

              dispatch(setRideId(ride.id));
              dispatch(setSelectedDriver(item));
            } catch (error) {
              console.log(error);
            }
          }}
          style={[
            tw`rounded-3xl p-4 mb-4 shadow border`,
            theme.card,
            !item.is_available && tw`opacity-50`,
          ]}
        >
          <View style={tw`flex-row justify-between items-start`}>
            <View>
              <Text
                style={[
                  tw`text-lg font-bold`,
                  theme.text,
                ]}
              >
                {item.name}
              </Text>

              <Text
                style={[
                  tw`text-sm mt-0.5`,
                  theme.secondaryText,
                ]}
              >
                {item.ride_type}
              </Text>
            </View>

            <View
              style={[
                tw`flex-row items-center px-2 py-1 rounded-full`,
                {
                  backgroundColor: `${colors.warning}20`,
                },
              ]}
            >
              <Text
                style={{
                  color: colors.warning,
                }}
              >
                ⭐
              </Text>

              <Text
                style={[
                  tw`font-semibold text-sm ml-1`,
                  {
                    color: colors.warning,
                  },
                ]}
              >
                {item.rating}
              </Text>
            </View>
          </View>

          <View
            style={[
              tw`h-px my-3`,
              theme.divider,
            ]}
          />

          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center flex-1`}>
              <View
                style={[
                  tw`w-10 h-10 rounded-full items-center justify-center mr-3`,
                  theme.surface,
                ]}
              >
                <Text style={tw`text-lg`}>🚘</Text>
              </View>

              <View>
                <Text
                  style={[
                    tw`text-sm font-medium`,
                    theme.text,
                  ]}
                >
                  {item.car_model}
                </Text>

                <Text
                  style={[
                    tw`text-xs mt-0.5`,
                    theme.secondaryText,
                  ]}
                >
                  {item.plate_number}
                </Text>
              </View>
            </View>

            <View
              style={[
                tw`px-3 py-1.5 rounded-full`,
                {
                  backgroundColor: item.is_available
                    ? `${colors.success}20`
                    : `${colors.danger}20`,
                },
              ]}
            >
              <Text
                style={[
                  tw`text-xs font-bold`,
                  {
                    color: item.is_available
                      ? colors.success
                      : colors.danger,
                  },
                ]}
              >
                {item.is_available
                  ? "● Available"
                  : "● Unavailable"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}