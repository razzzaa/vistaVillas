import { supabase, supabaseUrl, supabaseKey } from "./supabase";

const PAGE_SIZE = 15;

export async function getGuests({ sort, page, search }) {
  let query = supabase.from("guests").select("*", { count: "exact" });

  if (sort) {
    query = query.order(sort.field, { ascending: sort.direction === "asc" });
  }

  if (search) {
    query = query.or(`fullName.ilike.%${search}%,email.ilike.%${search}%`);
  }

  if (page) {
    const from = (page.curPage - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
  }

  return { data, count, PAGE_SIZE };
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
    if (error) {
      console.log(error);
    }
  }

  if (id) {
    console.log("there is an id");
    const { data: guest, error } = await supabase
      .from("guests")
      .update({ ...newGuest })
      .eq("id", id)
      .select();
    if (error) {
      console.log(error);
    }
  }
}

export async function deleteGuest(id) {
  const { error } = await supabase.from("guests").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cannot delete guest");
  }
}
