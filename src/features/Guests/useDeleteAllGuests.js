import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteAllGuests as apiDeleteAllGuest } from "../../services/apiGuests";

function useDeleteAllGuests() {
  const queryClient = useQueryClient();
  console.log(queryClient);

  const { mutateAsync: delAllGuests, isPending: isUpdating } = useMutation({
    mutationFn: apiDeleteAllGuest,
    onSuccess: () => {
      toast.success("Guests-Deleted!");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Unable To delete Guests");
    },
  });
  return { delAllGuests, isUpdating };
}

export default useDeleteAllGuests;
