import { rideState, selectDestinationDescription, selectedDriver, selectOriginDescription, selectTravelTimeInformation, startOver } from "@/store/slices/rideFlowSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import tw from "twrnc";

export default function TripStarted() {
  const status = useAppSelector(rideState);
  const dispatch = useAppDispatch();
  const origin = useAppSelector(selectOriginDescription);
  const destination = useAppSelector(selectDestinationDescription);
  const travelData = useAppSelector(selectTravelTimeInformation);
  const travelDuration = (travelData?.duration ?? 0) / 60;
  const driver = useAppSelector(selectedDriver);
  const isEnded = status === "trip_ended";

  return (
    <View style={tw`flex-1 justify-between bg-gray-50 px-5 pt-12 pb-8`}>
      <View style={tw`items-center mt-4`}>
        <Text style={tw`text-xs font-bold uppercase tracking-widest text-gray-400 mb-1`}>
          {isEnded ? "Status: Arrived" : "Current Trip"}
        </Text>
        <Text style={tw`text-2xl font-black text-gray-900`}>
          {isEnded ? "Trip Completed" : "Route to Destination"}
        </Text>
      </View>

      <View style={tw`w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 my-auto`}>
        <View style={tw`flex-row items-center justify-between mb-6`}>
          <View style={tw`w-14 h-14 rounded-2xl bg-blue-50 items-center justify-center`}>
            <Ionicons
              name={isEnded ? "checkmark-circle" : "navigate"}
              size={28}
              color={isEnded ? "#10b981" : "#3b82f6"}
            />
          </View>
          <View style={tw`flex-1 ml-4`}>
            <Text style={tw`text-sm text-gray-400 font-medium`}>
              {isEnded ? "Drop-off Time" : "Estimated Arrival"}
            </Text>
            <Text style={tw`text-xl font-bold text-gray-800`}>
              {isEnded ? `${new Date().getTime()}` : `${travelDuration} min`}
            </Text>
          </View>
        </View>

        {!isEnded ? (
          <View style={tw`bg-gray-50 rounded-2xl p-4 border border-gray-100`}>
            <View style={tw`flex-row items-center mb-3`}>
              <Ionicons name= "ellipse" size={12} color="#9ca3af" />
              <Text style={tw`text-sm text-gray-500 ml-3 font-medium flex-1`} numberOfLines={1}>
                Pickup: {origin}
              </Text>
            </View>
            
            <View style={tw`w-0.5 h-6 bg-gray-200 ml-1.5 mb-1`} />

            <View style={tw`flex-row items-center`}>
              <Ionicons name="location" size={16} color="#3b82f6" />
              <Text style={tw`text-sm text-gray-800 ml-2.5 font-semibold flex-1`} numberOfLines={1}>
                Destination: {destination}
              </Text>
            </View>
          </View>
        ) : (
          <View style={tw`bg-emerald-50 rounded-2xl p-4 border border-emerald-100 items-center`}>
            <Text style={tw`text-sm text-emerald-800 font-medium text-center`}>
              Hope you enjoyed your ride! Your receipt has been sent to your email.
            </Text>
          </View>
        )}
      </View>

      <View style={tw`w-full`}>
        {!isEnded ? (
          <View style={tw`flex-row items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-4`}>
            <View style={tw`w-12 h-12 rounded-full bg-gray-200 items-center justify-center`}>
              <Ionicons name="person" size={24} color="#6b7280" />
            </View>
            <View style={tw`flex-1 ml-3`}>
              <Text style={tw`text-base font-bold text-gray-800`}>{driver.car_model}.</Text>
              <Text style={tw`text-xs text-gray-500`}> {driver.name} • {driver.rating} ★</Text>
            </View>
            <View style={tw`flex-row gap-2`}>
              <View style={tw`w-10 h-10 rounded-full bg-gray-100 items-center justify-center`}>
                <Ionicons name="call" size={18} color="#4b5563" />
              </View>
            </View>
          </View>
        ) : (
          <Link
            href="/"
            onPress={() => { dispatch(startOver()); }}
            asChild
          >
            <View style={tw`bg-gray-900 w-full py-4 rounded-2xl items-center justify-center shadow-sm active:opacity-90`}>
              <Text style={tw`text-white font-bold text-base`}>
                Back to Home
              </Text>
            </View>
          </Link>
        )}
      </View>
    </View>
  );
}