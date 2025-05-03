import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetBookingsGuests } from "../../services/apiBookings";

function useResetBookingsGuests() {
  const queryClient = useQueryClient();

  const { mutateAsync: resBookingsGuests, isPending: isUpdating } = useMutation(
    {
      mutationFn: resetBookingsGuests,
      onSuccess: () => {
        toast.success("Bookings Guests-Reset");
        queryClient.invalidateQueries({ queryKey: ["bookings_guests"] });
      },
      onError: (err) => {
        console.error(err.message);
        toast.error("Unable To Reset Bookings");
      },
    }
  );
  return { resBookingsGuests, isUpdating };
}

export default useResetBookingsGuests;
