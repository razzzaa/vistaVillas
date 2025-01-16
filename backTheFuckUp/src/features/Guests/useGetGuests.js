import { getGuests } from "../../services/apiGuests";
import { useQuery } from "@tanstack/react-query";

export function useGuests() {
  const {
    data: guests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
  });

  console.log(guests);

  return { guests, isLoading, error };
}
