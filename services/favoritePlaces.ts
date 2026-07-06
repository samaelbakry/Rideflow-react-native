import { supabase } from "@/lib/supabase";

export async function addFavoritePlace({
  user_id,
  title,
  address,
  latitude,
  longitude,
}: {
  user_id: string;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
}) {
  const { error } = await supabase
  .from("favorite_places")
  .insert({
    user_id,
    title,
    address,
    latitude,
    longitude,
  });
  if(error) throw error
} 

export async function getFavoritePlaces(userId: string) {
  const { data, error } = await supabase
    .from("favorite_places")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function deleteFavoritePlace(id: string) {
  const { error } = await supabase
    .from("favorite_places")
    .delete()
    .eq("id", id);

  if (error) throw error;
}