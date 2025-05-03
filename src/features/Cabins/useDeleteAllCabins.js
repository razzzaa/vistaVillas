import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteAllCabins } from "../../services/apiCabins";

function useDeleteAllCabins() {
  const queryClient = useQueryClient();
  console.log(queryClient);

  const { mutateAsync: delAllCabins, isPending: isUpdating } = useMutation({
    mutationFn: deleteAllCabins,
    onSuccess: () => {
      toast.success("Cabin-Deleted!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Unable To delete Cabin");
    },
  });
  return { delAllCabins, isUpdating };
}

export default useDeleteAllCabins;
