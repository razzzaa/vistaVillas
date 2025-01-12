import { toast } from "react-toastify";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";

function useUpdateUser() {
  const userQuery = useQueryClient();

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      userQuery.invalidateQueries({ queryKey: ["user"] });
      toast.success("Updated successefully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Update failed");
    },
  });
  return { updateUser, isPending };
}

export default useUpdateUser;
