import { getSearchvalue } from "@/services/searchAutocomplete-service";
import { setDestination, setOrigin } from "@/store/slices/rideFlowSlice";
import { useAppDispatch } from "@/store/store";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={tw`gap-3`}>
        <View style={tw`relative`}>
          <TextInput
            value={rideDestination}
            onChangeText={setRideDestination}
            placeholder="Search destination..."
            placeholderTextColor="#6B7280"
            style={tw`
            bg-gray-100
            p-3
            rounded-xl
            text-gray-800
            shadow-md
            `}
          />
          {loading && (
            <View style={tw`absolute right-3 top-3`}>
              <ActivityIndicator size="small" color="#000" />
            </View>
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
                  setOrigin({
                    location: item.display_name,
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
