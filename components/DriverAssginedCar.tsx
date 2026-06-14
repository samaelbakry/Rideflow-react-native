import { selectedDriver, startTrip } from '@/store/slices/rideFlowSlice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import tw from "twrnc"

export default function DriverAssginedCar() {
  const dispatch = useAppDispatch()
  const driver = useAppSelector(selectedDriver)

  if (!driver) return null

  return (
    <View style={tw`bg-white m-4 p-5 rounded-3xl shadow-lg`}>
      <View style={tw`flex-row items-center justify-between mb-4`}>
        <Text style={tw`text-xl font-bold text-gray-900`}>
          Driver Found 🎉
        </Text>
        <View style={tw`bg-green-100 px-3 py-1 rounded-full`}>
          <Text style={tw`text-green-700 text-xs font-semibold`}>
            On the way
          </Text>
        </View>
      </View>

      <View style={tw`flex-row items-center mb-4`}>
       
        <View style={tw`flex-1`}>
          <Text style={tw`text-base font-bold text-gray-900`}>
            {driver.name}
          </Text>
          <View style={tw`flex-row items-center mt-1`}>
            <Ionicons name="star" size={14} color="#FBBF24" />
            <Text style={tw`text-sm text-gray-500 ml-1`}>
              {driver.rating ?? '4.9'} • {driver.tripsCount ?? '1.2k'} trips
            </Text>
          </View>
        </View>

        <View style={tw`flex-row gap-2`}>
          <TouchableOpacity style={tw`bg-gray-100 p-3 rounded-full`}>
            <Ionicons name="call" size={18} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity style={tw`bg-gray-100 p-3 rounded-full`}>
            <Ionicons name="chatbubble-ellipses" size={18} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`flex-row items-center justify-between bg-gray-50 rounded-2xl p-4 mb-4`}>
        <View style={tw`flex-row items-center`}>
          <Ionicons name="car-sport" size={22} color="#3B82F6" style={tw`mr-3`} />
          <View>
            <Text style={tw`text-sm font-semibold text-gray-900`}>
              {driver.carModel}
            </Text>
            <Text style={tw`text-xs text-gray-500 mt-0.5`}>
              {driver.carColor ?? 'Color'} • {driver.carType ?? 'Standard'}
            </Text>
          </View>
        </View>

        <View style={tw`bg-gray-900 px-3 py-2 rounded-xl`}>
          <Text style={tw`text-white font-bold tracking-widest`}>
            {driver.plateNumber}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => dispatch(startTrip())}
        style={tw`bg-blue-500 p-4 rounded-xl active:bg-blue-600`}
        activeOpacity={0.85}
      >
        <Text style={tw`text-center text-white font-bold text-base`}>
          Start Trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}