import { cars } from "@/constants/ride";
import {
  selectedCar,
  selectTravelTimeInformation,
  setSelectedCar
} from "@/store/slices/rideFlowSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function DriverCard() {
  const travelData = useAppSelector(selectTravelTimeInformation);

  const distanceKm = (travelData?.distance ?? 0) / 1000;
  const travelDuration = (travelData?.duration ?? 0) / 60;

  const formatDuration = travelDuration >= 60  ? `${(travelDuration / 60).toFixed(1)} hr`: `${Math.ceil(travelDuration)} min`;

  const baseFare = distanceKm * 8;
  const dispatch = useAppDispatch();
  const selectCar = useAppSelector(selectedCar);

  return (
    <>
  
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={cars}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`px-4 py-2`}
        ItemSeparatorComponent={() => <View style={tw`w-3`} />}
        renderItem={({ item }) => {
          const price = Math.round(baseFare * item.multiplier);

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                dispatch(setSelectedCar(item.id));
              }}
              style={[
                tw`
    flex-row items-center bg-white p-4 rounded-2xl shadow border-gray-100 border mb-3
  `,
                selectCar === item.id &&
                  tw`border-green-400 shadow shadow-green-200`,
              ]}
            >
              <Image
                source={item.image}
                style={{
                  width: 90,
                  height: 60,
                  resizeMode: "contain",
                }}
              />

              <View style={tw`flex-1 ml-4`}>
                <Text style={tw`text-lg font-bold text-gray-900`}>
                  {item.title}
                </Text>

                <Text style={tw`text-gray-500 text-sm mt-1`}>
                  {formatDuration} away
                </Text>
              </View>

              <Text style={tw`text-lg font-bold text-black`}>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "EGP",
                }).format(price)}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}
