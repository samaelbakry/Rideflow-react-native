import { createThemeStyles } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { FavoritePlace } from "@/types/PropsTypes";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function FavoritePlaceCard({
  item,
  onDelete,
}: {
  item: FavoritePlace;
  onDelete: (id: string) => void;
}) {
  const colors = useThemeColors();
  const theme = createThemeStyles(colors);

  return (
    <View
      style={[
        tw`border rounded-2xl p-4 mr-3 w-66 shadow-sm flex-row items-center justify-between`,
        theme.card,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        style={tw`flex-row items-center flex-1 pr-2`}
      >
        <View
          style={[
            tw`w-10 h-10 rounded-full items-center justify-center`,
            { backgroundColor: colors.textMuted }
          ]}
        >
          <Ionicons 
            name="heart" 
            size={18} 
            color={colors.primary || "#f43f5e"} 
          />
        </View>

        <View style={tw`ml-3 flex-1`}>
          <Text
            numberOfLines={1}
            style={[tw`font-semibold text-sm`, theme.text]}
          >
            {item.title}
          </Text>
          <Text 
            numberOfLines={1} 
            style={[tw`text-xs mt-0.5`, theme.secondaryText]}
          >
            {item.address}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => onDelete(item.id!)}
        style={[
          tw`w-8 h-8 rounded-full items-center justify-center`,
          { backgroundColor: colors.divider || "rgba(239, 68, 68, 0.1)" }
        ]}
      >
        <Ionicons 
          name="trash-outline" 
          size={16} 
          color={colors.warning} 
        />
      </TouchableOpacity>
    </View>
  );
}