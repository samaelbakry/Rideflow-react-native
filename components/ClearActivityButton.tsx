import { Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { supabase } from "@/lib/supabase";
import { clearRideHistory } from "@/services/rideData";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

export default function ClearActivityButton({
  setRides,
}: {
  setRides: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const handleClear = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    Alert.alert(
      "Clear Ride History",
      "Are you sure you want to delete all your rides?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await clearRideHistory(user.id);
              setRides([]);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  };
  return (
    <>
      <TouchableOpacity
        onPress={handleClear}
        activeOpacity={0.8}
        style={tw`self-end flex-row items-center bg-red-50 border border-red-200 px-3 py-2 rounded-full`}
      >
        <Ionicons name="trash-outline" size={16} color="#dc2626" />

        <Text style={tw`text-red-600 text-xs font-semibold ml-1`}>
          Clear History
        </Text>
      </TouchableOpacity>
    </>
  );
}
