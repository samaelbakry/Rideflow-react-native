import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/store";
import tw from "twrnc";
import { getSearchvalue } from "@/services/searchAutocomplete-service";
import { setDestination } from "@/store/slices/rideFlowSlice";
import { Ionicons } from "@expo/vector-icons";

export default function NavigateCard() {
  const [rideDestination, setRideDestination] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

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
    setRideDestination("");
    setResults([]);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={tw`gap-3 m-4`}>
        <View style={tw`relative`}>
          <TextInput
            value={rideDestination}
            onChangeText={setRideDestination}
            placeholder="where to?..."
            placeholderTextColor="#6B7280"
            style={tw`
             bg-gray-100
             p-3
             pr-10
             rounded-xl
            text-gray-800
            shadow-md `}
          />

          {loading && (
            <View style={tw`absolute right-9 top-3`}>
              <ActivityIndicator size="small" color="#000" />
            </View>
          )}

          {rideDestination.length > 0 && (
            <TouchableOpacity
              onPress={handleClear}
              style={tw`absolute right-3 top-3`}
            >
              <Ionicons name="close-circle" size={20} color="#000" />
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          keyboardShouldPersistTaps="handled"
          style={tw`bg-white rounded-xl`}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  setDestination({
                    description: item.display_name,
                    latitude: parseFloat(item.lat),
                    longitude: parseFloat(item.lon),
                  }),
                  setDestination(null),
                );

                setRideDestination(item.display_name);
                setResults([]);
              }}
              style={tw`
            p-3
            border-b
            shadow
            mb-3
            border-gray-200
            `}
            >
              <Text style={tw`text-gray-700`}>{item.display_name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
