import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { checkInOut } from "../../services/apiCheckInOut";
function useCheckInOut() {
  const userQuery = useQueryClient();

  const {
    data,
    mutate: check,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ status, id }) => checkInOut(status, id),
    onSuccess: () => {
      userQuery.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Checked In Successfully");
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Check-In failed");
      console.log(data);
    },
  });
  return { check, isPending, error };
}

export default useCheckInOut;
