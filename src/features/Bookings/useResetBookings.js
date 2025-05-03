import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetBookings } from "../../services/apiBookings";

function useResetBookings() {
  const queryClient = useQueryClient();

  const { mutateAsync: resBookings, isPending: isUpdating } = useMutation({
    mutationFn: resetBookings,
    onSuccess: () => {
      toast.success("Bookings-Reset");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Unable To Reset Bookings");
    },
  });
  return { resBookings, isUpdating };
}

export default useResetBookings;
