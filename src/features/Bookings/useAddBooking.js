import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addEditBookings as apiAddBooking } from "../../services/apiBookings";

function useAddBooking() {
  const queryClient = useQueryClient();

  const { mutate: addBooking, isPending: isUpdating } = useMutation({
    mutationFn: (newCabinData) => apiAddBooking(newCabinData),
    onSuccess: () => {
      toast.success("Booking-Added");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Unable To Add Booking");
    },
  });
  return { addBooking, isUpdating };
}

export default useAddBooking;
