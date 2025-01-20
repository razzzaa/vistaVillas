import { constPageSize } from "../utils/pageSize";
import { supabase, supabaseUrl, supabaseKey } from "./supabase";

export async function getCabins({ page, filter, sort }) {
  let query = supabase.from("cabins").select("*", { count: "exact" });
  console.log(filter);

  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  if (sort) {
    query = query.order(sort.field, { ascending: sort.direction === "asc" });
  }

  if (page) {
    const from = (page - 1) * constPageSize;
    const to = from + constPageSize - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("cabins cannot be loaded");
  }

  return { data, count };
}

export async function addEditCabin(newCabin, id) {
  const imageHasPath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image[0].name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = imageHasPath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  if (!id) {
    console.log("no id");
    const { data: cabin, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();
    console.log(cabin);
    if (error) {
      console.log(error);
    }
  }

  if (id) {
    console.log("there is an id");
    const { data: cabin, error } = await supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
    if (error) {
      console.log(error);
    }
  }

  if (!imageHasPath) {
    const { error: storageError } = await supabase.storage
      .from("cabins")
      .upload(imageName, newCabin.image[0]);
    if (storageError) {
      console.log(storageError);
    }
  }
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cannot delete cabin");
  } else {
    console.log("success motherfucka!");
  }
}
