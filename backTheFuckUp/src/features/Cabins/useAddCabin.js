import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addEditCabin as apiAddCabins } from "../../services/apiCabins";

function useAddCabin() {
  const queryClient = useQueryClient();

  const { mutate: addCabins, isPending: isUpdating } = useMutation({
    mutationFn: (newCabinData) => apiAddCabins(newCabinData),
    onSuccess: () => {
      toast.success("Cabin Added");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Unable To Add Cabin");
    },
  });
  return { addCabins, isUpdating };
}

export default useAddCabin;
