import { createThemeStyles } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { getDrivers } from "@/services/rideData";
import { Driver } from "@/types/rideTypes";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import tw from "twrnc";

export default function MiniPreview() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  const colors = useThemeColors();
  const theme = createThemeStyles(colors);

  useEffect(() => {
    async function loadDrivers() {
      try {
        const data = await getDrivers();
        setDrivers(data.filter((driver) => driver.is_available));
      } finally {
        setLoading(false);
      }
    }

    loadDrivers();
  }, []);

  const estimatedPickup = useMemo(() => {
    const count = drivers.length;

    if (count >= 8) return "2-3 min";
    if (count >= 5) return "3-5 min";
    if (count >= 2) return "5-7 min";
    return "8+ min";
  }, [drivers]);

  return (
    <View>
      <Text
        style={[
          tw`text-xs font-bold uppercase mb-3 tracking-wider px-1`,
          theme.heading,
        ]}
      >
        Ride Availability
      </Text>

      <View
        style={[
          tw`rounded-3xl p-5 border`,
          theme.card,
          { borderColor: colors.border },
        ]}
      >
        {loading ? (
          <View style={tw`py-6 items-center`}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          <>
            <View style={tw`flex-row justify-between`}>
              <View style={tw`items-center flex-1`}>
                <Ionicons
                  name="car-sport"
                  size={24}
                  color={colors.primary}
                />
                <Text
                  style={[tw`text-2xl font-bold mt-2`, theme.text]}
                >
                  {drivers.length}
                </Text>
                <Text
                  style={[tw`text-xs mt-1`, theme.secondaryText]}
                >
                  Drivers Nearby
                </Text>
              </View>

              <View
                style={[
                  tw`w-px mx-4`,
                  { backgroundColor: colors.border },
                ]}
              />

              <View style={tw`items-center flex-1`}>
                <Ionicons
                  name="time-outline"
                  size={24}
                  color={colors.success}
                />
                <Text
                  style={[tw`text-2xl font-bold mt-2`, theme.text]}
                >
                  {estimatedPickup}
                </Text>
                <Text
                  style={[tw`text-xs mt-1`, theme.secondaryText]}
                >
                  Pickup Time
                </Text>
              </View>
            </View>

            <View
              style={[
                tw`mt-5 rounded-2xl p-3 flex-row items-center`,
                {
                  backgroundColor: `${colors.success}15`,
                },
              ]}
            >
              <Ionicons
                name="checkmark-circle"
                size={18}
                color={colors.success}
              />

              <Text
                style={[
                  tw`ml-2 text-sm flex-1`,
                  {
                    color: colors.success,
                    fontWeight: "600",
                  },
                ]}
              >
                Drivers are available in your area.
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}