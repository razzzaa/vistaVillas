import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteAllBookings } from "../../services/apiBookings";

function useDeleteAllBookings() {
  const queryClient = useQueryClient();
  console.log(queryClient);

  const { mutateAsync: delAllBookings, isPending: isUpdating } = useMutation({
    mutationFn: deleteAllBookings,
    onSuccess: () => {
      toast.success("Bookings-Deleted!");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Unable To delete Bookings");
    },
  });
  return { delAllBookings, isUpdating };
}

export default useDeleteAllBookings;
