import Container from "@/components/common/Container";
import { cars } from "@/constants/ride";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

export default function Services() {
  return (
    <Container>
      <Text style={tw`text-lg font-semibold mb-3 px-3`}>
        All you need starts with a click
      </Text>

      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={tw`justify-between mb-4`}
        contentContainerStyle={tw`px-2 py-2`}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={tw`bg-white/60 rounded-2xl p-4 shadow border border-gray-100 w-[48%]`}
          >
            <Image
              source={item.image}
              style={{
                width: 110,
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
    </Container>
  );
}