import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetCabins } from "../../services/apiCabins";

function useResetCabins() {
  const queryClient = useQueryClient();

  const { mutateAsync: resCabins, isPending: isUpdating } = useMutation({
    mutationFn: resetCabins,
    onSuccess: () => {
      toast.success("Cabins-Reset");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Unable To Reset Cabins");
    },
  });
  return { resCabins, isUpdating };
}

export default useResetCabins;
