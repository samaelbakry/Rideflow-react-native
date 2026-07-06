import { getPromos } from "@/services/recentRides";
import { Promo } from "@/types/PropsTypes";
import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import PromoCard from "./PromoCard";
import tw from "twrnc"
import { useThemeColors } from "@/hooks/use-theme-colors";
import { createThemeStyles } from "@/constants/theme";

export default function PromoCarousel() {
  const [promos, setPromos] = useState<Promo[]>([]);

   const colors = useThemeColors();
  const theme = createThemeStyles(colors);

  useEffect(() => {
    fetchPromos();
  }, []);

  async function fetchPromos() {
    try {
      const promosData = await getPromos();
      setPromos(promosData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <Text style={[tw`text-gray-400 font-bold px-2 mt-2 uppercase text-xs tracking-wider`, theme.text]}>Promos</Text>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={promos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PromoCard promo={item} />}
      />
    </>
  );
}
