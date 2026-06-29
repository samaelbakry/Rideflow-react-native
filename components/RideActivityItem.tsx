import { View, Text } from 'react-native'
import React from 'react'
import tw from "twrnc"

export default function RideActivityItem({item}:{item:any}) {
  return (
   <>
    <View style={tw`bg-white rounded-3xl p-5 mb-4 border border-gray-100/80 shadow-sm`}>
        
            <View style={tw`flex-row justify-between items-start mb-5`}>
              <View>
                <Text style={tw`text-base font-bold text-gray-900 tracking-tight`}>
                  {item.cars?.title || 'Standard Ride'}
                </Text>
                <Text style={tw`text-gray-400 text-xs font-medium mt-1`}>
                  {new Date(item?.created_at).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </Text>
              </View>

            
              <View
                style={tw.style(
                  "px-2.5 py-1 rounded-full border",
                  item.status === "trip_ended" ? "bg-green-50 border-green-100" :
                  item.status === "trip_started" ? "bg-blue-50 border-blue-100" : 
                  "bg-amber-50 border-amber-100"
                )}
              >
                <Text
                  style={tw.style(
                    "text-[10px] font-bold tracking-wider",
                    item.status === "trip_ended" ? "text-green-700" :
                    item.status === "trip_started" ? "text-blue-700" : 
                    "text-amber-700"
                  )}
                >
                  {item.status?.replace("_", " ").toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={tw`flex-row h-16 mb-5`}>
              <View style={tw`items-center justify-between mr-3.5 py-1`}>
                <View style={tw`w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100`} />
                <View style={tw`w-[1.5px] flex-1 bg-gray-200 my-1`} />
                <View style={tw`w-2.5 h-2.5 rounded-full bg-rose-500 ring-4 ring-rose-100`} />
              </View>

              <View style={tw`flex-1 justify-between`}>
                <Text numberOfLines={1} style={tw`text-gray-800 text-sm font-medium tracking-tight`}>
                  {item.origin}
                </Text>
                <Text numberOfLines={1} style={tw`text-gray-500 text-sm font-medium tracking-tight`}>
                  {item.destination}
                </Text>
              </View>
            </View>

            <View style={tw`flex-row items-center justify-between border-t border-b border-gray-50 py-3.5`}>
              <View style={tw`flex-row items-center`}>
                <View style={tw`bg-gray-100 w-9 h-9 rounded-full items-center justify-center mr-3`}>
                  <Text style={tw`text-gray-600 font-bold text-sm`}>
                    {item.drivers?.name?.charAt(0).toUpperCase() || 'D'}
                  </Text>
                </View>
                <View>
                  <Text style={tw`text-sm font-semibold text-gray-800`}>{item.drivers?.name}</Text>
                  <View style={tw`flex-row items-center mt-0.5`}>
                    <Text style={tw`text-amber-500 text-xs`}>★</Text>
                    <Text style={tw`text-gray-400 text-xs font-medium ml-1`}>
                      {item.drivers?.rating?.toFixed(1) || '0.0'}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={tw`items-end`}>
                <Text style={tw`text-gray-400 text-[10px] font-bold uppercase tracking-wider`}>Fare</Text>
                <Text style={tw`text-lg font-black text-gray-900 mt-0.5`}>EGP {item.price}</Text>
              </View>
            </View>

            <View style={tw`flex-row justify-between mt-4 px-2`}>
              <View style={tw`items-start flex-1`}>
                <Text style={tw`text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5`}>Distance</Text>
                <Text style={tw`text-sm font-bold text-gray-800`}>
                  {(item.distance / 1000).toFixed(1)} km
                </Text>
              </View>

              <View style={tw`items-center flex-1 border-l border-r border-gray-100`}>
                <Text style={tw`text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5`}>Duration</Text>
                <Text style={tw`text-sm font-bold text-gray-800`}>
                  {Math.round(item.duration / 60)} min
                </Text>
              </View>

              <View style={tw`items-end flex-1`}>
                <Text style={tw`text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5`}>Car Model</Text>
                <Text style={tw`text-sm font-bold text-gray-800`} numberOfLines={1}>
                  {item.drivers?.car_model || '—'}
                </Text>
              </View>
            </View>

          </View>
   </>
  )
}