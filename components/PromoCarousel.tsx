import { getPromos } from "@/services/recentRides";
import { Promo } from "@/types/PropsTypes";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import PromoCard from "./PromoCard";

export default function PromoCarousel() {
  const [promos, setPromos] = useState<Promo[]>([]);

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

  // const flatListRef = useRef<FlatList>(null);
  // const indexRef = useRef(0);

  // useEffect(() => {
  //   if (promos.length === 0) return;

  //   const interval = setInterval(() => {
  //     indexRef.current = (indexRef.current + 1) % promos.length;

  //     flatListRef.current?.scrollToIndex({
  //       index: indexRef.current,
  //       animated: true,
  //     });
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, [promos]);
  return (
    <FlatList
      //  ref={flatListRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      data={promos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PromoCard promo={item} />}
    />
  );
}
