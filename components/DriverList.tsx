import { cars, drivers } from "@/constants/ride";
import { selectedCar, setSelectedDriver } from "@/store/slices/rideFlowSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function DriverList() {
  const dispatch = useAppDispatch();
  const selectedCarType = useAppSelector(selectedCar);
  const driversData = drivers.filter((driver) =>
  cars.find((car) => car.id === selectedCarType)?.title === driver.rideType
);

  return (  
    <FlatList
      data={driversData}
      keyExtractor={(item) => item.id}
      contentContainerStyle={tw`p-4`}
      renderItem={({ item }) => (
        <TouchableOpacity
        onPress={() => {
          if (!item.isAvailable) return;
          dispatch(setSelectedDriver(item));
        }}
        style={[
          tw`bg-white rounded-3xl p-4 mb-4 shadow-sm`,
          !item.isAvailable && tw`opacity-50`,
        ]}
        >
          <View style={tw`flex-row justify-between items-start`}>
            <View>
              <Text style={tw`text-lg font-bold text-gray-900`}>
                {item.name}
              </Text>
              <Text style={tw`text-sm text-gray-500 mt-0.5`}>
                {item.rideType}
              </Text>
            </View>

            <View
              style={tw`flex-row items-center bg-yellow-50 px-2 py-1 rounded-full`}
              >
              <Text style={tw`text-yellow-500 text-sm`}>⭐</Text>
              <Text style={tw`text-yellow-700 font-semibold text-sm ml-1`}>
                {item.rating}
              </Text>
            </View>
          </View>

          <View style={tw`h-px bg-gray-100 my-3`} />

          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center flex-1`}>
              <View
                style={tw`w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3`}
                >
                <Text style={tw`text-lg`}>🚘</Text>
              </View>
              <View>
                <Text style={tw`text-sm font-medium text-gray-800`}>
                  {item.carModel}
                </Text>
                <Text style={tw`text-xs text-gray-500 mt-0.5`}>
                  {item.plateNumber}
                </Text>
              </View>
            </View>

            <View
              style={tw`px-3 py-1.5 rounded-full ${
                item.isAvailable ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <Text
                style={tw`text-xs font-bold ${
                  item.isAvailable ? "text-green-700" : "text-red-600"
                }`}
                >
                {item.isAvailable ? "● Available" : "● Unavailable"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      />
  );
}
