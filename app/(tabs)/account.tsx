import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { logout } from "@/store/slices/authSlice";
import { signOut } from "@/services/auth";

export default function Account() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = async () => {
  try {
    await signOut();
    dispatch(logout());
  } catch (error: any) {
    Alert.alert(error.message);
  }
};

  const initial = user?.name?.charAt(0)?.toUpperCase() ?? "U";

  return (
    <View style={tw`bg-white/90 flex-1 px-6`}>

    <View style={tw`items-center mt-24 mb-14`}>
    <View
      style={tw`size-28 rounded-full shadow bg-zinc-300 items-center justify-center mb-6`}
    >
      <Text style={tw`text-zinc-800 text-5xl font-bold`}>
        {initial}
      </Text>
    </View>

    <Text style={tw`text-zinc-800 text-3xl font-bold mb-2`}>
      {user?.name || "Guest User"}
    </Text>

    <Text style={tw`text-zinc-500 text-base`}>
      {user?.email}
    </Text>
  </View>

  
  <View
    style={tw`bg-zinc-100 border border-zinc-200 rounded-3xl p-6 mb-6`}
  >
    <Text style={tw`text-zinc-500 text-sm mb-2`}>
      Full Name
    </Text>

    <Text style={tw`text-zinc-800 text-lg font-semibold mb-6`}>
      {user?.name}
    </Text>

    <Text style={tw`text-zinc-500 text-sm mb-2`}>
      Email Address
    </Text>

    <Text style={tw`text-zinc-800 text-lg font-semibold`}>
      {user?.email}
    </Text>
  </View>
  <View style={tw`bg-zinc-100 border border-zinc-200 rounded-3xl mb-4`}>
  <TouchableOpacity
    style={tw`flex-row items-center justify-between p-5`}
  >
    <View style={tw`flex-row items-center`}>
      <Ionicons
        name="person-outline"
        size={22}
        color="black"
      />
      <Text style={tw`text-zinc-800 ml-4 text-base`}>
        Edit Profile
      </Text>
    </View>

    <Ionicons
      name="chevron-forward"
      size={22}
      color="#71717a"
    />
  </TouchableOpacity>
</View>

  <TouchableOpacity
    onPress={handleLogout}
    style={tw`bg-zinc-800 rounded-2xl h-15 flex-row items-center justify-center`}
  >
    <Ionicons
      name="log-out-outline"
      size={22}
      color="white"
    />

    <Text style={tw`text-white text-lg font-bold ml-2`}>
      Logout
    </Text>
  </TouchableOpacity>
  
</View>
  );
}