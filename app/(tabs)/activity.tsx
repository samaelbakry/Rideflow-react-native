import ClearActivityButton from "@/components/ClearActivityButton";
import RideActivityItem from "@/components/RideActivityItem";
import { createThemeStyles } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { supabase } from "@/lib/supabase";
import { getUserRides } from "@/services/rideData";
import { CreateRideProps } from "@/types/PropsTypes";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import tw from "twrnc";

export default function Activity() {
  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const colors = useThemeColors();
  const theme = createThemeStyles(colors);

  const styles = {
    container: {
      backgroundColor: theme.container.backgroundColor,
    },
    text: {
      color: theme.text.color,
    },
    secondaryText: {
      color: theme.secondaryText.color,
    },
  };

  useEffect(() => {
    loadRides();
  }, []);

  async function loadRides() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const data = await getUserRides(user.id);
      setRides(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View
        style={[
          tw`flex-1 justify-center items-center`,
          styles.container,
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[tw`flex-1 pt-12`, styles.container]}>
      <View style={tw`flex-row justify-between items-center px-5 mt-5`}>
        <Text style={[tw`text-xl font-semibold`, styles.text]}>
          Rides History
        </Text>

        {rides.length > 0 && (
          <ClearActivityButton setRides={setRides} />
        )}
      </View>

      <FlatList
        data={rides}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`p-4 pb-10`}
        ListEmptyComponent={() => (
          <View style={tw`flex-1 justify-center items-center mt-32 px-4`}>
            <Text style={[tw`font-medium text-sm`, styles.secondaryText]}>
              No rides recorded yet
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <RideActivityItem item={item as CreateRideProps} />
        )}
      />
    </View>
  );
}