import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetGuests } from "../../services/apiGuests";

function useResetGuests() {
  const queryClient = useQueryClient();

  const { mutateAsync: resGuests, isPending: isUpdating } = useMutation({
    mutationFn: resetGuests,
    onSuccess: () => {
      toast.success("Guest-Reset");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Unable To Reset Guest");
    },
  });
  return { resGuests, isUpdating };
}

export default useResetGuests;
