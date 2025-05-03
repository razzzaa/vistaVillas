import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteGuest as apiDeleteGuest } from "../../services/apiGuests";

function useDeleteGuests() {
  const queryClient = useQueryClient();
  console.log(queryClient);

  const { mutate: delGuest, isPending: isUpdating } = useMutation({
    mutationFn: apiDeleteGuest,
    onSuccess: () => {
      toast.success("Guest-Deleted!");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Unable To delete Guest");
    },
  });
  return { delGuest, isUpdating };
}

export default useDeleteGuests;
