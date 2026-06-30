import { supabase } from "@/lib/supabase";
import { RideReview } from "@/types/PropsTypes";

export async function createRideReview(review:RideReview) {
    const {error} = await supabase
    .from("ride_reviews")
    .insert(review);

    if(error) throw error;
}