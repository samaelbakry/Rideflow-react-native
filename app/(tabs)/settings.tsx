import Appearance from "@/components/Appearance";
import Container from "@/components/common/Container";
import { createThemeStyles } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { signOut } from "@/services/auth";
import { logout } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function Settings() {
  const user = useAppSelector((state) => state.auth.user);
  const initial = user?.name?.charAt(0)?.toUpperCase() ?? "U";
  const dispatch = useAppDispatch();

  const colors = useThemeColors();
  const theme = createThemeStyles(colors);
  const navigate = useRouter()

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
    <Container style={[tw`flex-1 pt-16 px-6`, theme.container]}>
      <View style={tw`mb-8`}>
        <Text style={[tw`text-3xl font-black tracking-tight`, theme.text]}>
          Settings
        </Text>

        <Text style={[tw`text-sm mt-1`, theme.secondaryText]}>
          Manage your account and preferences
        </Text>
      </View>

      <Text
        style={[
          tw`text-xs font-bold uppercase tracking-wider mb-2.5 px-1`,
          theme.mutedText,
        ]}
      >
        Account Information
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => console.log("Navigate to Edit Profile")}
        style={[
          tw`rounded-3xl p-4.5 mb-6 border shadow-sm flex-row items-center justify-between`,
          theme.card,
        ]}
      >
        <View style={tw`flex-row items-center flex-1`}>
          <View
            style={[
              tw`w-14 h-14 rounded-2xl items-center justify-center overflow-hidden`,
              { backgroundColor: colors.primary },
            ]}
          >
            {user?.avatar_url ? (
              <Image
                source={{ uri: user.avatar_url }}
                style={tw`w-full h-full`}
                resizeMode="cover"
              />
            ) : (
              <Text
                style={[
                  tw`text-xl font-bold`,
                  { color: colors.onPrimary },
                ]}
              >
                {initial}
              </Text>
            )}
          </View>

          <View style={tw`ml-4 flex-1`}>
            <Text style={[tw`text-base font-bold`, theme.text]}>
              {user?.name || "John Doe"}
            </Text>

            <Text style={[tw`text-sm mt-0.5`, theme.mutedText]}>
              {user?.email || "john@gmail.com"}
            </Text>
          </View>
        </View>

        <View
          style={[
            tw`p-1.5 rounded-xl border`,
            theme.surface,
            theme.border,
          ]}
        >
          <Ionicons
            name="chevron-forward"
            size={16}
            color={colors.icon}
          />
        </View>
      </TouchableOpacity>

      <Text
        style={[
          tw`text-xs font-bold uppercase tracking-wider mb-2.5 px-1`,
          theme.mutedText,
        ]}
      >
        Account Settings
      </Text>

      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigate.push(`/editProfile`)}
          style={[
            tw`rounded-3xl p-4.5 mb-8 border shadow-sm flex-row items-center justify-between`,
            theme.card,
          ]}
        >
          <View style={tw`flex-row items-center flex-1`}>
            <View
              style={[
                tw`w-14 h-14 rounded-2xl items-center justify-center`,
                { backgroundColor: colors.primary },
              ]}
            >
              <Ionicons
                name="cog"
                color={colors.onPrimary}
                size={24}
              />
            </View>

            <View style={tw`ml-4 flex-1`}>
              <Text style={[tw`text-base font-bold`, theme.text]}>
                Edit Profile
              </Text>
            </View>
          </View>

          <View
            style={[
              tw`p-1.5 rounded-xl border`,
              theme.surface,
              theme.border,
            ]}
          >
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.icon}
            />
          </View>
        </TouchableOpacity>
      </View>

      <Text
        style={[
          tw`text-xs font-bold uppercase tracking-wider mb-2.5 px-1`,
          theme.mutedText,
        ]}
      >
        Preferences
      </Text>

      <View
        style={[
          tw`rounded-3xl p-4 border shadow-sm mb-6`,
          theme.card,
        ]}
      >
        <Appearance />
      </View>

      <View style={tw`flex-1`} />

      <TouchableOpacity
        onPress={handleLogout}
        activeOpacity={0.8}
        style={tw`bg-red-50 border border-red-100 rounded-2xl h-14 flex-row items-center justify-center mb-6`}
      >
        <Ionicons
          name="log-out-outline"
          color={colors.danger}
          size={20}
        />

        <Text
          style={[
            tw`font-semibold ml-2 text-base`,
            { color: colors.danger },
          ]}
        >
          Log Out
        </Text>
      </TouchableOpacity>
    </Container>
  );
}