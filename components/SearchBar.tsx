import { createThemeStyles } from "@/constants/theme";
import { useNetworkStatus } from "@/hooks/use-network-status";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { getSearchvalue } from "@/services/searchAutocomplete-service";
import {
  selectOrigin,
  setDestination,
  setOrigin,
} from "@/store/slices/rideFlowSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import tw from "twrnc";

export default function SearchBar() {
  const [rideDestination, setRideDestination] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const colors = useThemeColors();
  const theme = createThemeStyles(colors);
  const isConnected = useNetworkStatus();

  const dispatch = useAppDispatch();
  const origin = useAppSelector(selectOrigin);

  useEffect(() => {
    if (origin) {
      setRideDestination(origin.description!);
    }
  }, [origin]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (rideDestination.trim().length > 2) {
        handleSearch(rideDestination);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [rideDestination]);

  const handleSearch = async (query: string) => {
    if (!isConnected) {
      Alert.alert("No Internet", "Please check your connection.");
      return;
    }
    try {
      setLoading(true);
      const data = await getSearchvalue({ query });
      setResults(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleClear = () => {
    if (!isConnected) {
      Alert.alert("No Internet", "Please check your connection.");
      return;
    }
    setRideDestination("");
    dispatch(
      setOrigin(null),
    );
    setResults([]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={tw`gap-3`}>
        <View style={tw`relative`}>
          <TextInput
            value={rideDestination}
            onChangeText={setRideDestination}
            placeholder="Where from?"
            placeholderTextColor={colors.textMuted}
            style={[tw`p-3 pr-10 rounded-2xl shadow-md border`, theme.input]}
          />

          {loading && (
            <View style={tw`absolute right-9 top-3`}>
              <ActivityIndicator size="small" color={colors.primary} />
            </View>
          )}

          {rideDestination.length > 0 && (
            <TouchableOpacity
              onPress={handleClear}
              style={tw`absolute right-3 top-3`}
            >
              <Ionicons name="close-circle" size={20} color={colors.icon} />
            </TouchableOpacity>
          )}
        </View>

        <View
          style={[
            tw`rounded-2xl mb-2 flex-1`,
            theme.card,
            { backgroundColor: "transparent" },
          ]}
        >
          {results.map((item, index) => (
            <TouchableOpacity
              key={item.place_id || item.id || index.toString()}
              onPress={() => {
                dispatch(
                  setOrigin({
                    description: item.display_name,
                    latitude: parseFloat(item.lat),
                    longitude: parseFloat(item.lon),
                  }),
                );
                dispatch(setDestination(null));

                setRideDestination(item.display_name);
                setResults([]);
              }}
              style={[tw`p-3 border-b mb-3`, theme.listItem]}
            >
              <Text style={theme.text}>{item.display_name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
