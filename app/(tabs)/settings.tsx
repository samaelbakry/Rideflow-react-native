import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Container from "@/components/common/Container";
import tw from "twrnc";
import Appearance from "@/components/Appearance";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "@/services/auth";
import { logout } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Link } from "expo-router";

export default function Settings() {
  const user = useAppSelector((state) => state.auth.user);
  const initial = user?.name?.charAt(0)?.toUpperCase() ?? "U";
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
            dispatch(logout());
          } catch (error: any) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };

  return (
    <Container style={tw`flex-1 bg-zinc-50 pt-16 px-6`}>
      <View style={tw`mb-8`}>
        <Text style={tw`text-3xl font-black tracking-tight text-zinc-900`}>
          Settings
        </Text>
        <Text style={tw`text-zinc-500 text-sm mt-1`}>
          Manage your account and preferences
        </Text>
      </View>

      <Text
        style={tw`text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5 px-1`}
      >
        Account Information
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => console.log("Navigate to Edit Profile")}
        style={tw`bg-white rounded-3xl p-4.5 mb-6 border border-zinc-100 shadow-sm flex-row items-center justify-between`}
      >
        <View style={tw`flex-row items-center flex-1`}>
          <View
            style={[
              tw`w-14 h-14 rounded-2xl bg-zinc-900 items-center justify-center overflow-hidden`,
            ]}
          >
            {user?.avatar_url ? (
              <Image
                source={{ uri: user.avatar_url }}
                style={tw`w-full h-full`}
                resizeMode="cover"
              />
            ) : (
              <Text style={[tw`text-xl font-bold text-white`]}>{initial}</Text>
            )}
          </View>

          <View style={tw`ml-4 flex-1`}>
            <Text style={tw`text-base font-bold text-zinc-900`}>
              {user?.name || "John Doe"}
            </Text>
            <Text style={tw`text-zinc-400 text-sm mt-0.5`}>
              {user?.email || "john@gmail.com"}
            </Text>
          </View>
        </View>

        <View style={tw`bg-zinc-50 p-1.5 rounded-xl border border-zinc-100`}>
          <Ionicons name="chevron-forward" size={16} color="#a1a1aa" />
        </View>
      </TouchableOpacity>
      <Text
        style={tw`text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5 px-1`}
      >
        Account Settings
      </Text>
      <Link href="/editProfile" asChild>
        <TouchableOpacity
          activeOpacity={0.7}
          style={tw`bg-white rounded-3xl p-4.5 mb-8 border border-zinc-100 shadow-sm flex-row items-center justify-between`}
        >
          <View style={tw`flex-row items-center flex-1`}>
            <View
              style={tw`w-14 h-14 rounded-2xl bg-zinc-900 items-center justify-center`}
            >
              <Ionicons name="cog" color="white" size={24} />
            </View>

            <View style={tw`ml-4 flex-1`}>
              <Text style={tw`text-base font-bold text-zinc-900`}>
                Edit Profile
              </Text>
            </View>
          </View>

          <View style={tw`bg-zinc-50 p-1.5 rounded-xl border border-zinc-100`}>
            <Ionicons name="chevron-forward" size={16} color="#a1a1aa" />
          </View>
        </TouchableOpacity>
      </Link>

      <Text
        style={tw`text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5 px-1`}
      >
        Preferences
      </Text>
      <View
        style={tw`bg-white rounded-3xl p-4 border border-zinc-100 shadow-sm mb-6`}
      >
        <Appearance />
      </View>

      <View style={tw`flex-1`} />

      <TouchableOpacity
        onPress={handleLogout}
        activeOpacity={0.8}
        style={tw`bg-red-50 border border-red-100 rounded-2xl h-14 flex-row items-center justify-center mb-6`}
      >
        <Ionicons name="log-out-outline" color="#ef4444" size={20} />
        <Text style={tw`text-red-500 font-semibold ml-2 text-base`}>
          Log Out
        </Text>
      </TouchableOpacity>
    </Container>
  );
}
