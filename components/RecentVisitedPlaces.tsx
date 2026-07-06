import { View, Text, TouchableOpacity, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { selectUser } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";
import {
  clearRecentPlacesHistory,
  getRecentPlace,
} from "@/services/recentRides";
import { RecentPlace } from "@/types/PropsTypes";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { createThemeStyles } from "@/constants/theme";

export default function RecentVisitedPlaces() {
  const userId = useSelector(selectUser)?.id;
  const [places, setPlaces] = useState<RecentPlace[]>([]);

  const colors = useThemeColors();
  const theme = createThemeStyles(colors);

  useEffect(() => {
    fetchRecentPlaces();
  }, [userId]);

  async function fetchRecentPlaces() {
    if (!userId) return;

    const allVisitedPlaces = await getRecentPlace(userId);
    setPlaces(allVisitedPlaces);
  }

  async function handleClear() {
    if (!userId) return;
    
    Alert.alert("clear", "Are you sure you want to clear history?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          try {
            await clearRecentPlacesHistory(userId);
            setPlaces([]);
          } catch (error: any) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  }

  return (
    <View style={tw`mt-6`}>
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={[tw`text-gray-400 font-bold mb-3 px-2 uppercase text-xs tracking-wider`, theme.text]}>
          Recent Places
        </Text>
        {places.length > 1 && (
          <View style={[tw`rounded-2xl shadow p-2 mb-3 text-xs tracking-wider`, theme.card]}>

              <TouchableOpacity style={tw`${colors.primary}`}  onPress={handleClear}>
                <Text style={tw`text-xs tracking-wider`}>Clear</Text>
              </TouchableOpacity>
          </View>
        )}
      </View>

      {places.length === 0 ? (
        <View style={[tw`rounded-2xl p-5 items-center`, theme.card]}>
          <Ionicons name="time-outline" size={32} color={colors.icon} />

          <Text style={[tw`mt-3 text-base font-semibold`, theme.text]}>
            No recent places
          </Text>

          <Text style={[tw`mt-1 text-center text-sm`, theme.secondaryText]}>
            Your recently visited destinations will appear here.
          </Text>
        </View>
      ) : (
        places.map((item , index) => (
          <TouchableOpacity
            key={index} 
            style={[
              tw`flex-row items-center py-3 rounded-xl px-2 mb-3 shadow-md`,
              theme.card,
            ]}
          >
            <View
              style={[
                tw`w-10 h-10 rounded-full items-center justify-center mr-3`,
                theme.avatar,
              ]}
            >
              <Ionicons name="time-outline" size={20} color={colors.icon} />
            </View>

            <View style={tw`flex-1`}>
              <Text numberOfLines={1} style={[tw`font-semibold`, theme.text]}>
                {item.title}
              </Text>

              <Text
                numberOfLines={1}
                style={[tw`text-xs mt-1`, theme.secondaryText]}
              >
                {item.address}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}