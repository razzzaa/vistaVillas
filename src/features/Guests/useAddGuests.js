import { toast } from "react-toastify";
import { addEditGuests as apiAddGuests } from "../../services/apiGuests";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useAddGuests() {
  const queryClient = useQueryClient();

  const { mutate: addGuests, isPending: isUpdating } = useMutation({
    mutationFn: apiAddGuests,
    onSuccess: () => {
      toast.success("Cabin Added");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Unable To Add Cabin");
    },
  });
  return { addGuests, isUpdating };
}

export default useAddGuests;