import { supabase, supabaseUrl, supabaseKey } from "./supabase";

export async function getGuests() {
  const { data: guests, error } = await supabase.from("guests").select("*");
  if (error) {
    console.error(error);
  } else {
    console.log(guests);
  }
}
