import { getCars } from "@/services/rideData";
import {
  selectedCar,
  selectTravelTimeInformation,
  setPrice,
  setSelectedCar,
} from "@/store/slices/rideFlowSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Car } from "@/types/rideTypes";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { createThemeStyles } from "@/constants/theme";

export default function DriverCard() {
  const travelData = useAppSelector(selectTravelTimeInformation);
  const [cars, setCars] = useState<Car[]>([]);

  const colors = useThemeColors();
  const theme = createThemeStyles(colors);

  const distanceKm = (travelData?.distance ?? 0) / 1000;
  const travelDuration = (travelData?.duration ?? 0) / 60;

  const formatDuration =
    travelDuration >= 60
      ? `${(travelDuration / 60).toFixed(1)} hr`
      : `${Math.ceil(travelDuration)} min`;

  const baseFare = distanceKm * 8;

  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectedCar);

  useEffect(() => {
    async function loadCars() {
      const data = await getCars();
      setCars(data);
    }

    loadCars();
  }, []);

  return (
    <FlatList
      data={cars}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={tw`px-4 py-2`}
      ItemSeparatorComponent={() => <View style={tw`h-3`} />}
      renderItem={({ item }) => {
        const price = Math.round(baseFare * item.multiplier);

        const isSelected = selected === item.id;

        return (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              dispatch(setPrice(price));
              dispatch(setSelectedCar(item.id));
            }}
            style={[
              tw`flex-row items-center p-4 rounded-2xl border`,
              theme.card,
              isSelected && theme.selectedCard
            ]}
          >
            <Image
              source={{ uri: item.image_url }}
              style={{
                width: 90,
                height: 60,
                resizeMode: "contain",
              }}
            />

            <View style={tw`flex-1 ml-4`}>
              <Text
                style={[
                  tw`text-lg font-bold`,
                  theme.text,
                ]}
              >
                {item.title}
              </Text>

              <Text
                style={[
                  tw`text-sm mt-1`,
                  theme.secondaryText,
                ]}
              >
                {formatDuration} away
              </Text>
            </View>

            <Text
              style={[
                tw`text-lg font-bold`,
                {
                  color: isSelected
                    ? colors.primary
                    : colors.text,
                },
              ]}
            >
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "EGP",
              }).format(price)}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}