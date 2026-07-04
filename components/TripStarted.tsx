import {
  rideState,
  selectDestinationDescription,
  selectedDriver,
  selectOriginDescription,
  selectTravelTimeInformation,
  selectTripEndedAt,
  startOver,
} from "@/store/slices/rideFlowSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import RatingDriver from "./RatingDriver";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { createThemeStyles } from "@/constants/theme";

export default function TripStarted() {
  const dispatch = useAppDispatch();

  const colors = useThemeColors();
  const theme = createThemeStyles(colors);

  const status = useAppSelector(rideState);
  const isEnded = status === "trip_ended";
  const driver = useAppSelector(selectedDriver);

  const origin = useAppSelector(selectOriginDescription);
  const destination = useAppSelector(selectDestinationDescription);
  const travelData = useAppSelector(selectTravelTimeInformation);

  const tripEndedAt = useAppSelector(selectTripEndedAt);
  const navigate = useRouter()

  const arrivalTime = new Date(
    Date.now() + (travelData?.duration ?? 0) * 1000
  );

  const formattedArrival = arrivalTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View
      style={[
        tw`flex-1 justify-between px-5 pt-12 pb-8`,
        theme.container,
      ]}
    >
      <View style={tw`items-center mt-4`}>
        <Text
          style={[
            tw`text-xs font-bold uppercase tracking-widest mb-1`,
            theme.mutedText,
          ]}
        >
          {isEnded ? "Status: Arrived" : "Current Trip"}
        </Text>

        <Text
          style={[
            tw`text-2xl font-black`,
            theme.text,
          ]}
        >
          {isEnded ? "Trip Completed" : "Route to Destination"}
        </Text>
      </View>

      <View
        style={[
          tw`w-full rounded-3xl p-6 border my-auto`,
          theme.card,
        ]}
      >
        <View style={tw`flex-row items-center justify-between mb-6`}>
          <View
            style={[
              tw`w-14 h-14 rounded-2xl items-center justify-center`,
              {
                backgroundColor: isEnded
                  ? `${colors.success}20`
                  : `${colors.primary}20`,
              },
            ]}
          >
            <Ionicons
              name={isEnded ? "checkmark-circle" : "navigate"}
              size={28}
              color={isEnded ? colors.success : colors.primary}
            />
          </View>

          <View style={tw`flex-1 ml-4`}>
            <Text
              style={[
                tw`text-sm font-medium`,
                theme.secondaryText,
              ]}
            >
              {isEnded ? "Drop-off Time" : "Estimated Arrival"}
            </Text>

            <Text
              style={[
                tw`text-xl font-bold`,
                theme.text,
              ]}
            >
              {isEnded
                ? new Date(tripEndedAt!).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : formattedArrival}
            </Text>
          </View>
        </View>

        {!isEnded ? (
          <View
            style={[
              tw`rounded-2xl p-4 border`,
              theme.surface,
              theme.border,
            ]}
          >
            <View style={tw`flex-row items-center mb-3`}>
              <Ionicons
                name="ellipse"
                size={12}
                color={colors.textMuted}
              />

              <Text
                numberOfLines={1}
                style={[
                  tw`text-sm ml-3 font-medium flex-1`,
                  theme.secondaryText,
                ]}
              >
                Pickup: {origin}
              </Text>
            </View>

            <View
              style={[
                tw`w-0.5 h-6 ml-1.5 mb-1`,
                theme.divider,
              ]}
            />

            <View style={tw`flex-row items-center`}>
              <Ionicons
                name="location"
                size={16}
                color={colors.primary}
              />

              <Text
                numberOfLines={1}
                style={[
                  tw`text-sm ml-2.5 font-semibold flex-1`,
                  theme.text,
                ]}
              >
                Destination: {destination}
              </Text>
            </View>
          </View>
        ) : (
          <RatingDriver />
        )}
      </View>

      <View style={tw`w-full`}>
        {!isEnded ? (
          <View
            style={[
              tw`flex-row items-center p-4 rounded-2xl border mb-4`,
              theme.card,
            ]}
          >
            <View
              style={[
                tw`w-12 h-12 rounded-full items-center justify-center`,
                theme.avatar,
              ]}
            >
              <Ionicons
                name="person"
                size={24}
                color={colors.icon}
              />
            </View>

            <View style={tw`flex-1 ml-3`}>
              <Text
                style={[
                  tw`text-base font-bold`,
                  theme.text,
                ]}
              >
                {driver.car_model}
              </Text>

              <Text
                style={[
                  tw`text-xs`,
                  theme.secondaryText,
                ]}
              >
                {driver.name} • {driver.rating} ★
              </Text>
            </View>

            <View style={tw`flex-row gap-2`}>
              <View
                style={[
                  tw`w-10 h-10 rounded-full items-center justify-center`,
                  theme.surface,
                ]}
              >
                <Ionicons
                  name="call"
                  size={18}
                  color={colors.icon}
                />
              </View>
            </View>
          </View>
        ) : (
      
            <TouchableOpacity
             onPress={() => (dispatch(startOver()) , navigate.push("/") )}
              style={[
                tw`w-full py-4 my-3 rounded-2xl items-center justify-center`,
                theme.primaryIconContainer,
              ]}
            >
              <Text
                style={{
                  color: colors.onPrimary,
                  fontWeight: "700",
                  fontSize: 16,
                }}
              >
                Back to Home
              </Text>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
}