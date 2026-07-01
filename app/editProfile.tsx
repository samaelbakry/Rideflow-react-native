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

export default function EditProfile() {
  const user = useAppSelector((state) => state.auth.user);

  const [name, setName] = useState(user?.name ?? "");
  const [image, setImage] = useState<string | null>(null);

  const initial = name.charAt(0).toUpperCase();
  const dispatch = useAppDispatch();
  const avatar = image ?? user?.avatar_url;

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Please allow access to your photos.");
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
      let avatarImage = user?.avatar_url;
      if (image) {
        avatarImage = image ? await uploadAvatarToBucket(authUser?.id!, image) : user?.avatar_url
      }
      await updateProfile(authUser?.id, name, avatarImage);

      dispatch(
        setUser({
          ...user,
          name,
          avatar_url: avatarImage,
        }),
      );

      Alert.alert("Success", "Profile updated successfully");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <View style={tw`flex-1 bg-white/90 px-6 pt-16`}>
      <Text style={tw`text-3xl font-bold text-zinc-900 mb-8`}>
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
              style={tw`size-28 rounded-full shadow bg-zinc-300 items-center justify-center mb-6`}
            >
              <Text style={tw`text-zinc-800 text-5xl font-bold`}>
                {initial}
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={pickImage}
            style={tw`absolute bottom-1 right-1 w-10 h-10 rounded-full bg-black items-center justify-center`}
          >
            <Ionicons name="camera" size={18} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={pickImage} style={tw`mt-4`}>
          <Text style={tw`text-blue-600 font-semibold`}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`mb-6`}>
        <Text style={tw`text-zinc-500 mb-2`}>Full Name</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          style={tw`border border-zinc-300 rounded-2xl px-4 py-4 text-base`}
        />
      </View>

      <View style={tw`mb-8`}>
        <Text style={tw`text-zinc-500 mb-2`}>Email</Text>

        <TextInput
          value={user?.email}
          editable={false}
          style={tw`border border-zinc-300 rounded-2xl px-4 py-4 bg-zinc-100 text-zinc-500`}
        />

        <Text style={tw`text-xs text-zinc-400 mt-2`}>
          Email cannot be changed.
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleSave}
        style={tw`bg-black rounded-2xl py-4 items-center`}
      >
        <Text style={tw`text-white font-bold text-lg`}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}
