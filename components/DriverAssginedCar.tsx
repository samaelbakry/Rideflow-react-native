import { updateRideStatus } from "@/services/rideData";
import {
  driverArrived,
  selectedDriver,
  selectedRideId,
  startTrip,
} from "@/store/slices/rideFlowSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import CancelRideButton from "./CancelRideButton";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { createThemeStyles } from "@/constants/theme";

export default function DriverAssginedCar() {
  const dispatch = useAppDispatch();

  const driver = useAppSelector(selectedDriver);
  const driverIsHere = useAppSelector(driverArrived);
  const rideId = useAppSelector(selectedRideId);

  const colors = useThemeColors();
  const theme = createThemeStyles(colors);

  async function handlePress() {
    try {
      if (!rideId) return;
      await updateRideStatus(rideId, "trip_started");
      dispatch(startTrip());
    } catch (error) {
      console.log(error);
    }
  }

  if (!driver) return null;

  return (
    <View
      style={[
        tw`m-4 p-5 rounded-3xl shadow-lg border`,
        theme.card,
      ]}
    >
      <View style={tw`flex-row items-center justify-between mb-4`}>
        <Text
          style={[
            tw`text-xl font-bold`,
            theme.text,
          ]}
        >
          Driver Found 🎉
        </Text>

        <View
          style={[
            tw`px-3 py-1 rounded-full`,
            {
              backgroundColor: driverIsHere
                ? `${colors.success}20`
                : `${colors.primary}20`,
            },
          ]}
        >
          <Text
            style={[
              tw`text-xs font-semibold`,
              {
                color: driverIsHere
                  ? colors.success
                  : colors.primary,
              },
            ]}
          >
            {driverIsHere ? "Driver Arrived!" : "On the way..."}
          </Text>
        </View>
      </View>

      <View style={tw`flex-row items-center mb-4`}>
        <View style={tw`flex-1`}>
          <Text
            style={[
              tw`text-base font-bold`,
              theme.text,
            ]}
          >
            {driver.name}
          </Text>

          <View style={tw`flex-row items-center mt-1`}>
            <Ionicons
              name="star"
              size={14}
              color={colors.warning}
            />

            <Text
              style={[
                tw`text-sm ml-1`,
                theme.secondaryText,
              ]}
            >
              {driver.rating ?? "4.9"} • {driver.tripsCount ?? "1.2k"} trips
            </Text>
          </View>
        </View>

        <View style={tw`flex-row gap-2`}>
          <TouchableOpacity
            style={[
              tw`p-3 rounded-full`,
              theme.surface,
            ]}
          >
            <Ionicons
              name="call"
              size={18}
              color={colors.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              tw`p-3 rounded-full`,
              theme.surface,
            ]}
          >
            <Ionicons
              name="chatbubble-ellipses"
              size={18}
              color={colors.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={[
          tw`flex-row items-center justify-between rounded-2xl p-4 mb-4 border`,
          theme.surface,
          theme.border,
        ]}
      >
        <View style={tw`flex-row items-center`}>
          <Ionicons
            name="car-sport"
            size={22}
            color={colors.primary}
            style={tw`mr-3`}
          />

          <View>
            <Text
              style={[
                tw`text-sm font-semibold`,
                theme.text,
              ]}
            >
              {driver.car_model}
            </Text>

            <Text
              style={[
                tw`text-xs mt-0.5`,
                theme.secondaryText,
              ]}
            >
              {driver.color ?? "Color"} • {driver.ride_type ?? "Standard"}
            </Text>
          </View>
        </View>

        <View
          style={[
            tw`px-3 py-2 rounded-xl`,
            theme.primaryIconContainer,
          ]}
        >
          <Text
            style={{
              color: colors.onPrimary,
              fontWeight: "700",
              letterSpacing: 2,
            }}
          >
            {driver.plate_number}
          </Text>
        </View>
      </View>

      {driverIsHere ? (
        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.85}
          style={[
            tw`p-4 rounded-xl`,
            theme.primaryIconContainer,
          ]}
        >
          <Text
            style={{
              color: colors.onPrimary,
              textAlign: "center",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Start Trip
          </Text>
        </TouchableOpacity>
      ) : (
        <CancelRideButton />
      )}
    </View>
  );
}