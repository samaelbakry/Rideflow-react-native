import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system/legacy";

export async function updateProfile(
  id: string,
  full_name: string,
  avatar_url?: string
) {
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name,
      avatar_url,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function uploadAvatarToBucket(userId:string ,imageUri:string ) {
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const filePath = `${userId}/avatar.jpg`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, decode(base64), {
      contentType: "image/jpeg",
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  return data.publicUrl;
}