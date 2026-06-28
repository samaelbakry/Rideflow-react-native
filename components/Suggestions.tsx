import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import tw from "twrnc";
import { useAppSelector } from "@/store/store";
import { selectOrigin } from "@/store/slices/rideFlowSlice";
import { Car } from "@/types/rideTypes";
import { getCars } from "@/services/rideData";

export default function Suggestions() {
  const origin = useAppSelector(selectOrigin);
    const [cars, setCars] = useState<Car[]>([]);
    useEffect(() => {
    async function loadCars() {
      const data = await getCars();
      setCars(data);
    }

    loadCars();
  }, []);

  return (
    <>
      <View style={tw`flex-row items-center justify-between my-2 px-3`}>
        <Text>Suggestions</Text>
        <Link href={"/services"}>See all</Link>
      </View>
      <FlatList
        data={cars}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`px-2 py-2`}
        ItemSeparatorComponent={() => <View style={tw`w-4`} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={tw`bg-white/60 rounded-2xl p-4 shadow-md border border-gray-100 w-40 ${origin ? "opacity-100" : "opacity-80"}`}
          >
            <Image
              source={{uri:item.image_url}}
              style={{
                width: 120,
                height: 80,
                resizeMode: "contain",
                alignSelf: "center",
              }}
            />

            <Text style={tw`text-center font-semibold text-base mt-2`}>
              {item.title}
            </Text>

            <Text style={tw`text-center text-gray-500 text-xs mt-1`}>
              Available now
            </Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
}
