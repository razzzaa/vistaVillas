import { toast } from "react-toastify";
import { addEditCabin } from "../../services/apiCabins";
import { useQueryClient, useMutation } from "@tanstack/react-query";

function useEditCabins() {
  const userQuery = useQueryClient();

  const { mutate: editCabin, isPending } = useMutation({
    mutationFn: ({ newCabinData, id }) => addEditCabin(newCabinData, id),
    onSuccess: () => {
      userQuery.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Edited successefully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Edit failed");
    },
  });
  return { editCabin, isPending };
}

export default useEditCabins;
