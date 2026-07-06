import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function FavoritePlaceCard({ item }: { item: any }) {
  return (
    <TouchableOpacity
      style={tw`bg-gray-100 rounded-2xl p-4 mr-3 w-64`}
    >
      <View style={tw`flex-row items-center`}>
        <View
          style={tw`w-11 h-11 rounded-full bg-black items-center justify-center`}
        >
          <Ionicons name="heart" size={20} color="white" />
        </View>

        <View style={tw`ml-3 flex-1`}>
          <Text style={tw`font-bold text-base`}>
            {item.title}
          </Text>

          <Text
            numberOfLines={1}
            style={tw`text-xs text-gray-500 mt-1`}
          >
            {item.address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}