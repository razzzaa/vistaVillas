import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateNumNights } from "../../services/apiBookings";

function useBookingNumNights() {
  const userQuery = useQueryClient();

  const { mutate: updateNights, isLoading } = useMutation({
    mutationFn: ({ numNights, id }) => updateNumNights(numNights, id),
    mutationKey: ["bookings"],
    onSuccess: () => {
      userQuery.invalidateQueries({ queryKey: ["bookings"] });
      console.log("number of nights updated");
    },
    nError: (error) => {
      console.error(error);
      console.log("total price update failed");
    },
  });
  return { updateNights, isLoading };
}

export default useBookingNumNights;
