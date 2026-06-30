import { supabase } from "@/lib/supabase";
import { CreateRideProps } from "@/types/PropsTypes";

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

export async function createRide(ride: CreateRideProps) {
  const { data, error } = await supabase
    .from("rides")
    .insert(ride)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateRideStatus(
  rideId: string,
  status: string,
) {
  const updates: any = {
    status,
  };

  if (status === "trip_ended") {
    updates.finished_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("rides")
    .update(updates)
    .eq("id", rideId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getUserRides(userId: string) {
 const { data , error } = await supabase
  .from("rides")
.select(`
    *,
    drivers!rides_driver_id_fkey(
      name,
      rating,
      car_model,
      ride_type
    ),
    cars(
      title,
      image_url
    ),
    ride_reviews!ride_reviews_ride_id_fkey(
      rating,
      comment
    )
  `)
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });
 
  if (error) throw error;

  return data;
}

export async function clearRideHistory(userId:string) {
  const {error} = await supabase
  .from("rides")
  .delete()
  .eq("user_id" , userId)
   if (error) throw error;
}