import ClearActivityButton from "@/components/ClearActivityButton";
import RideActivityItem from "@/components/RideActivityItem";
import { supabase } from "@/lib/supabase";
import { getUserRides } from "@/services/rideData";
import { CreateRideProps } from "@/types/PropsTypes";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function Activity() {
  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      <View style={tw`flex-1 bg-white/90 justify-center items-center`}>
        <ActivityIndicator size="large" color={"gray"} />
      </View>
    );
  }

  return (
  <View style={tw`flex-1 bg-white/90 pt-12`}>
    <View style={tw`flex-row justify-between items-center px-5 mt-5`}>
      <Text style={tw`text-xl font-semibold`}>
        Rides History
      </Text>
      {rides.length > 0 && <ClearActivityButton setRides={setRides}/>}
    </View>
      <FlatList
        data={rides}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`p-4 pb-10`}
        ListEmptyComponent={() => (
          <View style={tw`flex-1 justify-center items-center mt-32 px-4`}>
            <Text style={tw`text-gray-400 font-medium text-sm`}>No rides recorded yet</Text>
          </View>
        )}
        renderItem={({ item }) => (
         <RideActivityItem item={item as CreateRideProps}/>
        )}
      />
    </View>
  );
}
