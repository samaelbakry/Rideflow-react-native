export async function getSearchvalue({ query }: { query: string }) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}, Egypt&format=jsonv2&limit=5&countrycodes=eg`,
    );
    const data = await response.json();
    console.log(data);
    
    return data;

  } catch (error) {
    console.log(error);
  }
}