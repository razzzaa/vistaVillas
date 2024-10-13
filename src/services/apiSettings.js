import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();
  if (error) {
    console.error(error);
    throw new Error("cannot load settings");
  }
  console.log(data);
  return data;
}

export async function updateSettings(newSettings) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSettings)
    .eq("id", 1)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }

  return data;
}
