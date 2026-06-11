import { TextInput, View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getSearchvalue } from "@/services/searchAutocomple-service";
import tw from "twrnc";

export default function SearchBar() {
  const [destination, setDestination] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (destination.trim().length > 2) {
        handleSearch(destination);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [destination]);

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
    <View style={tw`gap-3`}>
      
      <TextInput
        value={destination}
        onChangeText={setDestination}
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
      {loading ? <Text style={tw`text-center text-xl`}>just a sec...</Text> :
       <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        keyboardShouldPersistTaps="handled"
        style={tw`bg-white rounded-xl`}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setDestination(item.display_name);
              setResults([]);
            }}
            style={tw`
              p-3
              border-b
              border-gray-200
            `}
          >
            <Text style={tw`text-gray-700`}>
              {item.display_name}
            </Text>
          </TouchableOpacity>
        )}
      />}
      
    </View>
  );
}