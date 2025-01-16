import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteBooking } from "../../services/apiBookings";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  console.log(queryClient);

  const { mutate: delBook, isPending: isUpdating } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("Booking-Deleted!");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Unable To delete Booking");
    },
  });
  return { delBook, isUpdating };
}

export default useDeleteBooking;
