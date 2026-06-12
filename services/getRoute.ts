import { LatLng } from "@/types/PropsTypes";

type Props = {
  origin: LatLng | null;
  destination: LatLng | null;
};

export async function getRoute(origin, destination:Props) {
  if (!origin || !destination) return [];

  const response = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`
  );

  const data = await response.json();

  return data.routes[0].geometry.coordinates.map(
    ([lng, lat]: number[]) => ({
      latitude: lat,
      longitude: lng,
    })
  );
}
