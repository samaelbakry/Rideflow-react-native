import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Marker } from "react-native-maps";
import carImage from "@/assets/images/car1.png";
import { Driver } from "@/types/rideTypes";
import { getDrivers } from "@/services/rideData";

export default function StaticCars() {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    async function loadCars() {
      const data = await getDrivers();
      setDrivers(data);
    }

    loadCars();
  }, []);

  return (
    <>
      {drivers.map((driver) => (
        <Marker
          key={driver.id}
          coordinate={{
            latitude: driver.lat,
            longitude: driver.lng,
          }}
        >
          <View style={{
            width:35,
            height:35,
            backgroundColor:"white",
            borderRadius: 50,
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
          }}>

          <Image
            source={carImage}
            style={{
              width: 35,
              height: 35,
              borderRadius: 18,
            }}
          />
          </View>
        </Marker>
      ))}
    </>
  );
}
