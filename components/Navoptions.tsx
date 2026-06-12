import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import car from "@/assets/images/car1.jpg";
import { useAppSelector } from "@/store/store";
import { selectOrigin } from "@/store/slices/rideFlowSlice";

export default function Navoptions() {
  const origin = useAppSelector(selectOrigin);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={tw`bg-white rounded-2xl p-3 shadow border border-gray-100 w-44`}
    >
      <Image
        source={car}
        style={{
          width: 120,
          height: 70,
          resizeMode: "contain",
          alignSelf: "center",
        }}
      />

      <Text style={tw`text-center text-gray-500 text-xs mt-2`}>
        Get ride now
      </Text>

      <View style={tw`mt-3 items-center`}>
        <Link href="/maps" asChild>
          <TouchableOpacity
            disabled={origin ? false : true}
            style={tw`bg-black px-4 py-2 rounded-full flex-row items-center gap-1 ${origin ? "opacity-100" : "opacity-80"}`}
          >
            <Text style={tw`text-white text-xs font-semibold`}>Start</Text>
            <Ionicons name="arrow-forward" size={16} color="white" />
          </TouchableOpacity>
        </Link>
      </View>
    </TouchableOpacity>
  );
}
