import { supabase, supabaseUrl, supabaseKey } from "./supabase";

export async function checkInOut(status, id) {
  console.log(status);
  console.log(id);
  const { data: booking, error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id)
    .select();
  if (error) {
    console.log(error);
  } else {
    console.log("success", booking);
    console.log(booking);
  }
}
