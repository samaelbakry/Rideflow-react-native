import { startOver } from "@/store/slices/rideFlowSlice";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

export default function CancelRideButton() {
  const dispatch = useAppDispatch();
  const navigate = useRouter();

  const handleClick = () => {
    dispatch(startOver());
    navigate.back();
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleClick}
        style={tw`bg-red-600 p-4 rounded-2xl active:bg-red-600`}
        activeOpacity={0.85}
      >
        <Text style={tw`text-center text-white font-bold text-base`}>
          Cancel Ride
        </Text>
      </TouchableOpacity>
    </>
  );
}
