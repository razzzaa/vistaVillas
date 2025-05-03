import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";

export function useCabinsAll() {
  const {
    isLoading,
    data: { data: cabinsAll } = {},
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { cabinsAll, isLoading, error };
}
