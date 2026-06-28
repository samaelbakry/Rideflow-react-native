import { supabase } from "@/lib/supabase";

export async function getCars() {
  const { data, error } = await supabase.from("cars").select("*");

  if (error) throw error;

  return data;
}
export async function getDrivers() {
  const { data, error } = await supabase.from("drivers").select("*");

  if (error) throw error;

  return data;
}
