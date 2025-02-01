import { getToday } from "../utils/helpers";
import { constPageSize } from "../utils/pageSize";
import { supabase } from "./supabase";

export async function getAllBookings({ filter, sortBy, page }) {
  let query = supabase.from("bookings").select(
    `id, created_at, startDate, endDate, numGuests, extraPrice, status, isPaid, observation,totalPrice, numNights,
      cabins(price_per_night, discount, availability, cabin_name),
      bookings_guests (hasBreakfast, guests (id, fullName, email, country, countryFlag)
      )`,
    { count: "exact" }
  );

  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * constPageSize;
    const to = from + constPageSize - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

export async function getBookingsById(id) {
  const { data: booking, error } = await supabase
    .from("bookings")
    .select(
      `id, created_at, startDate, endDate, numGuests, extraPrice, status, isPaid, observation, cabinId, totalPrice, numNights,
      cabins(price_per_night, discount, availability, cabin_name),
      bookings_guests (hasBreakfast, guests (id, fullName, email, country, countryFlag, nationalId)
      )`
    )
    .eq("id", id)
    .single();
  if (error) {
    console.log(error);
  }
  return booking;
}

export async function addEditBookings({
  newBooking,
  newBookingGuestsData,
  id,
}) {
  console.log(newBooking);
  console.log(newBookingGuestsData);

  if (!id) {
    console.log("no id");
    console.log(newBooking);
    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({ ...newBooking })
      .select()
      .single();

    if (error) {
      console.log(error);
    }

    const guestsArray = Object.entries(newBookingGuestsData).map(
      ([guestId, hasBreakfast]) => ({
        guests_id: Number(guestId), // Convert guest ID to number
        bookings_id: booking.id, // Attach new booking ID
        hasBreakfast: hasBreakfast === "TRUE", // Convert to Boolean
      })
    );

    console.log(guestsArray);
    const { data: guestsBooking, error2 } = await supabase
      .from("bookings_guests")
      .insert(guestsArray);

    if (error2) {
      console.log(error2);
    }

    console.log(guestsBooking);

    return { booking, guestsBooking };
  }

  if (id) {
    console.log("there is an id");
    console.log(id);
    console.log(newBooking);
    const { data: booking, error } = await supabase
      .from("bookings")
      .update({ ...newBooking })
      .eq("id", id)
      .select();
    if (error) {
      console.log(error);
    }
  }
}

export async function deleteBooking(id) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cannot delete booking");
  }
}

export async function calcFinalPrice(totalPrice, id) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ totalPrice: totalPrice })
    .eq("id", id)
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cannot get total price!");
  }
}

export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extraPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*", "booking_guests")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function updateNumNights(numNights, id) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ numNights: numNights })
    .eq("id", id)
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cannot update nimber of nights!");
  }
}
