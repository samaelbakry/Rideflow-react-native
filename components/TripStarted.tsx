import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { rideState, startOver } from "@/store/slices/rideFlowSlice";

export default function TripStarted() {
  const status = useAppSelector(rideState);
  const dispatch = useAppDispatch()

  const isEnded = status === "trip_ended";

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100 px-6`}>
      <View style={tw`w-full bg-white rounded-3xl p-8 items-center shadow-lg`}>
        <View
          style={tw`w-20 h-20 rounded-full bg-blue-100 items-center justify-center mb-5`}
        >
          <Ionicons
            name={isEnded ? "checkmark-circle" : "car-sport"}
            size={50}
            color={isEnded ? "#22c55e" : "#3b82f6"}
          />
        </View>

        <Text style={tw`text-2xl font-bold text-gray-900 mb-2`}>
          {isEnded ? "Trip Completed" : "On Our Way"}
        </Text>

        <Text style={tw`text-center text-gray-500 text-base mb-6`}>
          {isEnded
            ? "Thanks for riding with us. We hope you had a great trip!"
            : "Sit back and relax. Your driver is taking you to your destination."}
        </Text>

        {!isEnded && (
          <View style={tw`items-center`}>
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text style={tw`mt-3 text-gray-500`}>
              Arriving shortly...
            </Text>
          </View>
        )}

        {isEnded && (
          <Link
            href="/"
            onPress={()=>{dispatch(startOver())}}
            style={tw`bg-blue-500 px-8 py-4 rounded-2xl`}
          >
            <Text style={tw`text-white font-semibold text-base`}>
              Back to Home
            </Text>
          </Link>
        )}
      </View>
    </View>
  );
}