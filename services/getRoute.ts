import { LatLng } from "@/types/PropsTypes";

export async function getRoute(
  origin: LatLng | null,
  destination: LatLng | null,
) {
  if (!origin || !destination) return [];

  const response = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`,
  );

  const data = await response.json();

  return data.routes[0].geometry.coordinates.map(([lng, lat]: number[]) => ({
    latitude: lat,
    longitude: lng,
  }));
}

export async function getDirection(
  origin: LatLng | null,
  destination: LatLng | null,
) {
  try {
    if (!origin || !destination) return [];

    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`,
    );

    const data = await response.json();
    return data.routes[0];
  } catch (error) {
    console.log(error);
  }
}
