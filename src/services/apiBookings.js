import { supabase, supabaseUrl, supabaseKey } from "./supabase";

export async function getBookings() {
  const { data, error } = await supabase.from("bookings").select(
    `id, created_at, startDate, endDate, numNights, numGuests, extraPrice, status, hasBreakfast, observation,
      cabins(price_per_night, discount, availability, cabin_name),
      bookings_guests (
        guests (id, fullName, email, country, countryFlag)
      )`
  );

  if (error) {
    console.error("Error fetching bookings:", error);
  } else {
    console.log("Fetched bookings data:", data);
  }

  return data;
}

export async function addEditBookings(newBooking, id) {
  if (!id) {
    console.log("no id");
    console.log(newBooking);
    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({ ...newBooking })
      .select()
      .single();
    console.log(booking);
    if (error) {
      console.log(error);
    } else {
      console.log("success", booking);
    }
  }

  if (id) {
    console.log("there is an id");
    console.log(id);
    const { data: booking, error } = await supabase
      .from("bookings")
      .update({ ...newBooking })
      .eq("id", id)
      .select();
    if (error) {
      console.log(error);
    } else {
      console.log("success", booking);
      console.log(booking);
    }
  }
}

export async function deleteGuest(id) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cannot delete booking");
  } else {
    console.log("success motherfucka!");
  }
}
