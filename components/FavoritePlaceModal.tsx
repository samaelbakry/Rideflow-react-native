import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import React from "react";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { createThemeStyles } from "@/constants/theme";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { FavoritePlaceModalProps } from "@/types/PropsTypes";

export default function FavoritePlaceModal({
  open,
  setOpen,
  title,
  setTitle,
  recentPlaces,
  selectedPlace,
  setSelectedPlace,
  handleSave,
}: FavoritePlaceModalProps) {
  const colors = useThemeColors();
  const theme = createThemeStyles(colors);
  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent
      onRequestClose={() => setOpen(false)}
    >
      <Pressable
        style={tw`flex-1 bg-black/60 justify-end`}
        onPress={() => setOpen(false)}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={[tw`rounded-t-3xl p-6 max-h-[85%]`, theme.surface]}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={tw`flex-row justify-between items-center mb-5`}>
              <Text style={[tw`text-xl font-bold`, theme.text]}>
                Add Favorite Place
              </Text>
              <TouchableOpacity onPress={() => setOpen(false)} style={tw`p-1`}>
                <Ionicons
                  name="close-circle"
                  size={24}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Name (e.g., Home, Work...)"
              placeholderTextColor={colors.textMuted}
              value={title}
              onChangeText={setTitle}
              style={[tw`border rounded-xl p-3.5 text-base`, theme.input]}
            />

            <Text style={[tw`mt-5 mb-3 font-semibold text-sm`, theme.caption]}>
              Select Recent Destination
            </Text>

            <View style={tw`max-h-60`}>
              <FlatList
                data={recentPlaces}
                keyExtractor={(item, index) =>
                  item.id?.toString() || index.toString()
                }
                renderItem={({ item }) => {
                  const isSelected = selectedPlace?.id === item.id;
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setSelectedPlace(item)}
                      style={[
                        tw`p-3.5 rounded-xl mb-2 flex-row items-center border`,
                        isSelected ? theme.selectedCard : theme.listItem,
                        isSelected &&
                          !colors.primary &&
                          tw`bg-rose-900/20 border-rose-500`,
                      ]}
                    >
                      <View style={tw`mr-3`}>
                        <Ionicons
                          name="time-outline"
                          size={18}
                          color={
                            isSelected
                              ? colors.primary || "#f43f5e"
                              : colors.textMuted
                          }
                        />
                      </View>
                      <View style={tw`flex-1`}>
                        <Text style={[tw`font-medium text-sm`, theme.text]}>
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
                  );
                }}
                ListEmptyComponent={
                  <Text style={[tw`text-center py-6 text-sm`, theme.mutedText]}>
                    No recent places found
                  </Text>
                }
              />
            </View>

            <TouchableOpacity
              onPress={handleSave}
              activeOpacity={0.8}
              style={[
                tw`rounded-xl py-4 mt-4 items-center shadow-sm`,
                theme.container,
              ]}
            >
              <Text
                style={[tw`text-white font-semibold text-base`, theme.icon]}
              >
                Save Location
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
