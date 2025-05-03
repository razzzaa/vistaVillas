import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings as updateSettingsApi } from "../../services/apiSettings";
import { toast } from "react-toastify";

export function useUpdateSettings() {
  const settingsQuery = useQueryClient();

  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      settingsQuery.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Settings Updated Successefulyl");
    },
    onError: () => {
      toast.error("Unable To Update Settings!");
    },
  });
  return { updateSettings, isUpdating };
}
