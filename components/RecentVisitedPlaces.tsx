import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { selectUser } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";
import { getRecentPlace } from "@/services/recentRides";
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
  }, []);

  async function fetchRecentPlaces() {
    if (!userId) return;

    const allVisitedPlaces = await getRecentPlace(userId);
    setPlaces(allVisitedPlaces);
  }

  return (
    <View style={tw`mt-6`}>
      <Text style={[tw`text-lg font-bold mb-3`, theme.text]}>
        Recent Places
      </Text>

      {places.length === 0 ? (
        <View
          style={[
            tw`rounded-2xl p-5 items-center`,
            theme.card,
          ]}
        >
          <Ionicons
            name="time-outline"
            size={32}
            color={colors.icon}
          />

          <Text
            style={[
              tw`mt-3 text-base font-semibold`,
              theme.text,
            ]}
          >
            No recent places
          </Text>

          <Text
            style={[
              tw`mt-1 text-center text-sm`,
              theme.secondaryText,
            ]}
          >
            Your recently visited destinations will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={places}
          keyExtractor={(item) => item.title}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[tw`flex-row items-center py-3 rounded-xl px-2 mb-3 shadow-md` , theme.card]}
            >
              <View
                style={[
                  tw`w-10 h-10 rounded-full items-center justify-center mr-3`,
                  theme.avatar,
                ]}
              >
                <Ionicons
                  name="time-outline"
                  size={20}
                  color={colors.icon}
                />
              </View>

              <View style={tw`flex-1`}>
                <Text
                  numberOfLines={1}
                  style={[tw`font-semibold`, theme.text]}
                >
                  {item.title}
                </Text>

                <Text
                  numberOfLines={1}
                  style={[
                    tw`text-xs mt-1`,
                    theme.secondaryText,
                  ]}
                >
                  {item.address}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}