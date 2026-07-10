import { createThemeStyles } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import {
  addFavoritePlace,
  deleteFavoritePlace,
  getFavoritePlaces,
} from "@/services/favoritePlaces";
import { getRecentPlace } from "@/services/recentRides";
import { selectUser } from "@/store/slices/authSlice";
import { useAppSelector } from "@/store/store";
import { FavoritePlace, RecentPlace } from "@/types/PropsTypes";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
 Alert,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import tw from "twrnc";
import FavoritePlaceCard from "./FavoritePlaceCard";
import FavoritePlaceModal from "./FavoritePlaceModal";

export default function FavoritePlaces() {
  const colors = useThemeColors();
  const theme = createThemeStyles(colors);
  const [title, setTitle] = useState("");
  const [favoritePlaces, setFavoritePlaces] = useState<FavoritePlace[]>([]);
  const [recentPlaces, setRecentPlaces] = useState<RecentPlace[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<FavoritePlace | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  const userId = useAppSelector(selectUser)?.id;

  const handleSave = async () => {
    if (!selectedPlace) {
      Alert.alert("Error", "Select a destination first.");
      return;
    }
    if (!title.trim()) {
      Alert.alert("Error", "Enter a name for this place.");
      return;
    }

    try {
      await addFavoritePlace({
        user_id: userId!,
        title,
        address: selectedPlace.address,
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
      });

      await fetchPlaces();

      Alert.alert("Success", "Favorite place saved successfully!");
      setTitle("");
      setSelectedPlace(null);
      setOpen(false);
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Something went wrong");
    }
  };

  async function fetchPlaces() {
    if (!userId) return;
    try {
      const data = await getFavoritePlaces(userId);
      setFavoritePlaces(data ?? []);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchRecentPlaces() {
    if (!userId) return;
    try {
      const data = await getRecentPlace(userId);
      setRecentPlaces(data ?? []);
    } catch (error) {
      console.log(error);
    }
  }

  async function handelDelete(id: string) {
    Alert.alert(
      "Delete Favorite",
      "Are you sure you want to delete this place?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteFavoritePlace(id);
              setFavoritePlaces((prev) =>
                prev.filter((place) => place.id !== id),
              );
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  }

  useEffect(() => {
    if (!userId) return;
    fetchPlaces();
    fetchRecentPlaces();
  }, [userId]);

  return (
    <View style={tw`mt-5`}>
      {recentPlaces.length === 0 ? (
        <View style={[tw`p-4 rounded-xl my-2`, theme.card]}>
          <Text style={theme.text}>
            Visit a place first to save it as a favorite.
          </Text>
        </View>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            activeOpacity={0.8}
            style={[
              tw`flex-row items-center rounded-2xl p-4 shadow-md mb-3`,
              theme.card,
            ]}
          >
            <View
              style={[
                tw`w-10 h-10 rounded-full items-center justify-center`,
                theme.container,
              ]}
            >
              <Ionicons name="add" size={22} color={colors.primary} />
            </View>

            <View style={tw`pl-2`}>
              <Text style={[tw`font-semibold`, theme.text]}>
                Add Favorite Place
              </Text>
              <Text style={[tw`text-xs mt-0.5`, theme.mutedText]}>
                Save Home, Work or any key location
              </Text>
            </View>
          </TouchableOpacity>
          
          <View style={[theme.card, tw`rounded-2xl shadow-md p-4 mb-2`]}>
            <Text
              style={[
                tw`uppercase text-xs tracking-wider mb-3`,
                theme.heading
              ]}
            >
              Your Favorite Places
            </Text>

            <FlatList
              horizontal
              data={favoritePlaces}
              keyExtractor={(item, index) =>
                item.id?.toString() || index.toString()
              }
              renderItem={({ item }) => (
                <FavoritePlaceCard item={item} onDelete={handelDelete} />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw`pr-4`}
              ListEmptyComponent={
                <Text style={[tw`text-sm`, theme.mutedText]}>
                  No favorite places saved yet.
                </Text>
              }
            />
          </View>
        </>
      )}

      <FavoritePlaceModal
        open={open}
        setOpen={setOpen}
        title={title}
        setTitle={setTitle}
        recentPlaces={recentPlaces}
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
        handleSave={handleSave}
      />
    </View>
  );
}
