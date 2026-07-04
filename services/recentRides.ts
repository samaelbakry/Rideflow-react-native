import { supabase } from "@/lib/supabase";
import { RecentPlace } from "@/types/PropsTypes";

export async function saveRecentPlace(place: RecentPlace) {
  const { error } = await supabase.from("recent_places").insert(place);
  if (error) throw error;
}
export async function getRecentPlace(userId: string) {
  const { data, error } = await supabase.from("recent_places").select().eq("user_id", userId);
  if (error) throw error;
  return data;
}
export async function getPromos() {
  const { data, error } = await supabase
    .from("promos")
    .select("*")
    .eq("is_active", true)

  if (error) throw error;

  return data;
}