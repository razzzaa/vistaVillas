import { toast } from "react-toastify";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addEditGuests as apiEditGuest } from "../../services/apiGuests";

function useEditGuests() {
  const userQuery = useQueryClient();

  const { mutate: editGuest, isPending } = useMutation({
    mutationFn: ({ newCabinData, id }) => apiEditGuest(newCabinData, id),
    onSuccess: () => {
      userQuery.invalidateQueries({ queryKey: ["guests"] });
      toast.success("Edited successefully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Edit failed");
    },
  });
  return { editGuest, isPending };
}

export default useEditGuests;
