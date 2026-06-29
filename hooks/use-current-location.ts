import { useEffect, useState } from "react"
import * as Location from "expo-location";

export function useCurrentLocation() {
    const [location, setLocation] = useState<{lat:number , lng:number} | null>(null)

    useEffect(() => {
    async function getLocation() {
        const {status} =  await Location.requestForegroundPermissionsAsync()

        if(status !== "granted") return

        const current = await Location.getCurrentPositionAsync()
        setLocation({
        lat: current.coords.latitude,
        lng: current.coords.longitude,
      });

    }
    getLocation()
    }, [])

    return {location}
}