import { useQueryClient, useMutation } from "@tanstack/react-query";
import { calcFinalPrice } from "../../services/apiBookings";

function useCalcTotalPrice() {
  const userQuery = useQueryClient();

  const { mutate: calcTotalPrice, isPending } = useMutation({
    mutationFn: ({ totalPrice, id }) => calcFinalPrice(totalPrice, id),
    mutationKey: ["bookings"],
    onSuccess: () => {
      userQuery.invalidateQueries({ queryKey: ["bookings"] });
      console.log("total price updated");
    },
    onError: (error) => {
      console.error(error);
      console.log("total price update failed");
    },
  });
  return { calcTotalPrice, isPending };
}

export default useCalcTotalPrice;
