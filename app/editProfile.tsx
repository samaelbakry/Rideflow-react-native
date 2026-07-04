import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { useAppDispatch, useAppSelector } from "@/store/store";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "@/lib/supabase";
import {
  updateProfile,
  uploadAvatarToBucket,
} from "@/services/userProfileSettings";
import { setUser } from "@/store/slices/authSlice";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { createThemeStyles } from "@/constants/theme";

export default function EditProfile() {
  const user = useAppSelector((state) => state.auth.user);

  const [name, setName] = useState(user?.name ?? "");
  const [image, setImage] = useState<string | null>(null);

  const initial = name.charAt(0).toUpperCase();
  const dispatch = useAppDispatch();

  const colors = useThemeColors();
  const theme = createThemeStyles(colors);

  const avatar = image ?? user?.avatar_url;

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission", "Please allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;

    setImage(result.assets[0].uri);
  };

  async function handleSave() {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!user || !authUser) return;

    try {
      let avatarImage = user.avatar_url;

      if (image) {
        avatarImage = await uploadAvatarToBucket(authUser.id, image);
      }

      await updateProfile(authUser.id, name, avatarImage);

      dispatch(
        setUser({
          ...user,
          name,
          avatar_url: avatarImage,
        })
      );

      Alert.alert("Success", "Profile updated successfully");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <View style={[tw`flex-1 px-6 pt-16`, theme.container]}>
      <Text style={[tw`text-3xl font-bold mb-8`, theme.text]}>
        Edit Profile
      </Text>

      <View style={tw`items-center mb-10`}>
        <View style={tw`relative`}>
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              style={tw`w-28 h-28 rounded-full mb-6`}
            />
          ) : (
            <View
              style={[
                tw`size-28 rounded-full shadow items-center justify-center mb-6`,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text
                style={[
                  tw`text-5xl font-bold`,
                  { color: colors.onPrimary },
                ]}
              >
                {initial}
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={pickImage}
            style={[
              tw`absolute bottom-1 right-1 w-10 h-10 rounded-full items-center justify-center`,
              { backgroundColor: colors.primary },
            ]}
          >
            <Ionicons
              name="camera"
              size={18}
              color={colors.onPrimary}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={pickImage} style={tw`mt-4`}>
          <Text
            style={[
              tw`font-semibold`,
              { color: colors.primary },
            ]}
          >
            Change Photo
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw`mb-6`}>
        <Text style={[tw`mb-2`, theme.secondaryText]}>
          Full Name
        </Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor={colors.textMuted}
          style={[
            tw`border rounded-2xl px-4 py-4 text-base`,
            theme.input,
          ]}
        />
      </View>

      <View style={tw`mb-8`}>
        <Text style={[tw`mb-2`, theme.secondaryText]}>
          Email
        </Text>

        <TextInput
          value={user?.email}
          editable={false}
          placeholderTextColor={colors.textMuted}
          style={[
            tw`border rounded-2xl px-4 py-4`,
            theme.input,
            {
              backgroundColor: colors.background,
              color: colors.textSecondary,
            },
          ]}
        />

        <Text
          style={[
            tw`text-xs mt-2`,
            theme.mutedText,
          ]}
        >
          Email cannot be changed.
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleSave}
        disabled={!name.trim() || !image}
        style={[
          tw`rounded-2xl py-4 items-center disabled:opacity-50`,
          { backgroundColor: colors.primary },
        ]}
      >
        <Text
          style={[
            tw`font-bold text-lg`,
            { color: colors.onPrimary },
          ]}
        >
          Save Changes
        </Text>
      </TouchableOpacity>
    </View>
  );
}