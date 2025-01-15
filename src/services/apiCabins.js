import { supabase, supabaseUrl, supabaseKey } from "./supabase";

const PAGE_SIZE = 8;

export async function getCabins({ page }) {
  console.log(page);
  let query = supabase.from("cabins").select("*", { count: "exact" });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  console.log(data);

  if (error) {
    console.error(error);
    throw new Error("cabins cannot be loaded");
  }
  return { data, count };
}

export async function addEditCabin(newCabin, id) {
  const imageHasPath = newCabin.image?.startsWith?.(supabaseUrl);

  console.log(imageHasPath);

  const imageName = `${Math.random()}-${newCabin.image[0].name}`.replaceAll(
    "/",
    ""
  );
  console.log(imageName);

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
    } else {
      console.log("success", cabin);
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
    } else {
      console.log("success", cabin);
    }
  }

  if (!imageHasPath) {
    const { error: storageError } = await supabase.storage
      .from("cabins")
      .upload(imageName, newCabin.image[0]);
    if (storageError) {
      console.log(storageError);
    } else {
      console.log("ahui");
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
