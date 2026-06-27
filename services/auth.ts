import { supabase } from "@/lib/supabase";
import { LoginSchemaType, RegisterSchemaType } from "@/schemas/auth-schemas";

export async function login(values: LoginSchemaType) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) throw error;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (profileError) throw profileError;

  return {
    id: profile.id,
    name: profile.full_name,
    email: profile.email,
  };
}

export async function register(values: RegisterSchemaType) {
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        full_name: values.fullName,
      },
    },
  });

  if (error) throw error;

  if (!data.user) throw new Error("User not found");

  const { error: profileError } = await supabase.from("profiles").insert({
    id: data.user.id,
    full_name: values.fullName,
    email: values.email,
  });

  if (profileError) throw profileError;

  return {
    id: data.user.id,
    name: values.fullName,
    email: values.email,
  };
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return {
    id: user.id,
    email: user.email!,
    name: profile?.full_name,
  };
}

export async function signOut() {
  return await supabase.auth.signOut();
}