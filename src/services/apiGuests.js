import { supabase, supabaseUrl, supabaseKey } from "./supabase";

export async function getGuests({ sort, page: { curPage, pageSize }, search }) {
  let query = supabase.from("guests").select("*", { count: "exact" });

  if (sort) {
    query = query.order(sort.field, { ascending: sort.direction === "asc" });
  }

  if (search) {
    console.log(search);
    query = query.or(`fullName.ilike.%${search}%,email.ilike.%${search}%`);
    console.log(query);
  }

  if (curPage) {
    const from = (curPage - 1) * pageSize;
    const to = from + pageSize - 1;

    console.log(from);
    console.log(to);
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  console.log(data);

  if (error) {
    console.error(error);
  }

  return { data, count, pageSize };
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
