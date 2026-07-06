import { createThemeStyles } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { addFavoritePlace, getFavoritePlaces } from "@/services/favoritePlaces";
import { selectUser } from "@/store/slices/authSlice";
import {
  selectLastDestination,
  selectLastDestinationDescription,
} from "@/store/slices/rideFlowSlice";
import { useAppSelector } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import tw from "twrnc";
import FavoritePlaceCard from "./FavoritePlaceCard";

export default function FavoritePlaces() {
  const [open, setOpen] = useState(false);
  const colors = useThemeColors();
  const theme = createThemeStyles(colors);
  const [title, setTitle] = useState("");
  const [places, setPlaces] = useState([]);
  const lastDestination = useAppSelector(selectLastDestination);
  const lastDestinationDescription = useAppSelector(
    selectLastDestinationDescription,
  );

  const userId = useAppSelector(selectUser)?.id;

  const handleSave = async () => {
    if (!lastDestination || !lastDestinationDescription) {
      Alert.alert("Select a destination first.");
      return;
    }
    if (!title.trim()) {
      Alert.alert("Enter place name.");
      return;
    }

    try {
      await addFavoritePlace({
        user_id: userId!,
        title,
        address: lastDestinationDescription,
        latitude: lastDestination.latitude,
        longitude: lastDestination.longitude,
      });

      await fetchPlaces();

      Alert.alert("Success", "favorite place saved");
      setTitle("");
      setOpen(false);
    } catch (error: any) {
      Alert.alert("Error", error);
    }
  };

  async function fetchPlaces() {
    if (!userId) return;
    try {
      const data = await getFavoritePlaces(userId);
      setPlaces(data ?? []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <View style={tw`mt-5`}>
      <Text
        style={[
          tw`text-gray-400 font-bold px-2 mt-2 uppercase text-xs tracking-wider`,
          theme.text,
        ]}
      >
        Favorite Places
      </Text>

      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={tw`flex-row items-center bg-gray-100 rounded-2xl p-4`}
      >
        <View
          style={tw`w-10 h-10 rounded-full bg-black items-center justify-center`}
        >
          <Ionicons name="add" size={22} color="white" />
        </View>

        <View style={tw`ml-4`}>
          <Text style={tw`font-semibold`}>Add Favorite Place</Text>

          <Text style={tw`text-gray-500 text-xs`}>
            Save Home, Work or any location
          </Text>
        </View>
      </TouchableOpacity>
      <Modal
        visible={open}
        animationType="slide"
        transparent
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          style={tw`flex-1 bg-black/40 justify-end`}
          onPress={() => setOpen(false)}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={tw`bg-white rounded-t-3xl p-6`}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
              <Text style={tw`text-xl font-bold mb-5`}>Add Favorite Place</Text>

              <TextInput
                placeholder="Home, Work..."
                value={title}
                onChangeText={setTitle}
                style={tw`border border-gray-300 rounded-xl p-4 text-base`}
              />

              <View style={tw`mt-5 bg-gray-100 rounded-xl p-4`}>
                <Text style={tw`text-xs text-gray-500 mb-1`}>
                  Selected Address
                </Text>

                <Text style={tw`font-medium`}>
                  {lastDestinationDescription || "No destination selected"}
                </Text>
              </View>

              <TouchableOpacity
                onPress={handleSave}
                style={tw`bg-black rounded-2xl py-4 mt-6 items-center`}
              >
                <Text style={tw`text-white font-bold`}>Save Favorite</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </Pressable>
        </Pressable>
      </Modal>
      <View style={tw`mt-5`}>
        <Text
          style={[
            tw`text-gray-400 font-bold px-2 mt-2 uppercase text-xs tracking-wider`,
            theme.text,
          ]}
        >
          Your Favorite Places
        </Text>

        <FlatList
          horizontal
          data={places}
          keyExtractor={(index) => index}
          renderItem={({ item }) => <FavoritePlaceCard item={item} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`pt-3 pr-4`}
          ListEmptyComponent={
            <Text style={tw`text-gray-400 px-2`}>No favorite places yet.</Text>
          }
        />
      </View>
    </View>
  );
}
