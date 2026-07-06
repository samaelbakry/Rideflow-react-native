import { createThemeStyles } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { getSearchvalue } from "@/services/searchAutocomplete-service";
import {
  rideState,
  selectDestination,
  setDestination,
} from "@/store/slices/rideFlowSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import tw from "twrnc";
import DriverAssginedCar from "./DriverAssginedCar";
import DriverCard from "./DriverCard";
import DriverList from "./DriverList";
import TripStarted from "./TripStarted";

export default function NavigateCard() {
  const [rideDestination, setRideDestination] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const rideStatus = useAppSelector(rideState);
  const destination = useAppSelector(selectDestination);

  const colors = useThemeColors();
  const theme = createThemeStyles(colors);

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
    <>
      {rideStatus === "idle" && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={tw`gap-3 m-4`}>
            <View style={tw`relative`}>
              <TextInput
                value={rideDestination}
                onChangeText={setRideDestination}
                placeholder="Where to..."
                placeholderTextColor={colors.textMuted}
                style={[tw`p-3 pr-10 rounded-xl`, theme.input]}
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

            <View style={[tw`rounded-xl`, theme.card]}>
              {results.map((item, index) => (
                <TouchableOpacity
                  key={item.place_id || index.toString()}
                  onPress={() => {
                    dispatch(
                      setDestination({
                        description: item.display_name,
                        latitude: parseFloat(item.lat),
                        longitude: parseFloat(item.lon),
                      }),
                    );

                    setRideDestination(item.display_name);
                    setResults([]);
                  }}
                  style={[
                    tw`p-3 border-b`,
                    theme.border,
                    index === results.length - 1 && { borderBottomWidth: 0 },
                  ]}
                >
                  <Text style={theme.text}>{item.display_name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}

      {destination && rideStatus === "selecting_car" && <DriverCard />}

      {rideStatus === "searching_drivers" && <DriverList />}

      {rideStatus === "driver_assigned" && <DriverAssginedCar />}

      {(rideStatus === "trip_started" || rideStatus === "trip_ended") && (
        <TripStarted />
      )}
    </>
  );
}
