import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import { toast } from "react-toastify";

function useDeleteCabin() {
  const queryClient = useQueryClient();
  console.log(queryClient);

  const { mutate: delCab, isPending: isUpdating } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin-Deleted!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Unable To delete Cabin");
    },
  });
  return { delCab, isUpdating };
}

export default useDeleteCabin;
