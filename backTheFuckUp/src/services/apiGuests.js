import { supabase, supabaseUrl, supabaseKey } from "./supabase";

export async function getGuests() {
  let query = supabase.from("guests").select("*", { count: "exact" });

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }

  console.log(count);

  return { data, count };
}

export async function addEditGuests(newGuest, id) {
  if (!id) {
    console.log("no id");
    console.log(newGuest);
    const { data: guest, error } = await supabase
      .from("guests")
      .insert({ ...newGuest })
      .select()
      .single();
    console.log(guest);
    if (error) {
      console.log(error);
    } else {
      console.log("success", guest);
    }
  }

  if (id) {
    console.log("there is an id");
    console.log(id);
    const { data: guest, error } = await supabase
      .from("guests")
      .update({ ...newGuest })
      .eq("id", id)
      .select();
    if (error) {
      console.log(error);
    } else {
      console.log("success", guest);
      console.log(guest);
    }
  }
}

export async function deleteGuest(id) {
  const { error } = await supabase.from("guests").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cannot delete guest");
  } else {
    console.log("success motherfucka!");
  }
}
