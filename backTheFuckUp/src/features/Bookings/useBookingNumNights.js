import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateNumNights } from "../../services/apiBookings";

function useBookingNumNights() {
  const userQuery = useQueryClient();

  const { mutate: updateNights, isLoading } = useMutation({
    mutationFn: ({ numNights, id }) => updateNumNights(numNights, id),
    mutationKey: ["bookings"],
    onSuccess: () => {
      userQuery.invalidateQueries({ queryKey: ["bookings"] });
    },
    nError: (error) => {
      console.error(error);
    },
  });
  return { updateNights, isLoading };
}

export default useBookingNumNights;
