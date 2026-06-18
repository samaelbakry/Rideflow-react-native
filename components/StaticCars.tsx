import { drivers } from '@/constants/ride'
import React from 'react'
import { Image } from 'react-native'
import { Marker } from 'react-native-maps'
import carImage from "@/assets/images/car1.jpg";


export default function StaticCars() {
  return <>
    {drivers.map((driver) => (
            <Marker
              key={driver.id}
              coordinate={{
                latitude: driver.lat,
                longitude: driver.lng,
              }}
            >
              <Image
                source={carImage}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 18,
                }}
              />
            </Marker>
          ))}
  </>
}